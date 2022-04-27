---
title: "Oracle RAC DB Behind Nginx Proxy"
date: 2022-04-26T10:24:00+01:00
description: "oracle, db, nginx, proxy, scan, RAC"
slug: "oracle-rac-db-behind-nginx-proxy"
draft: false
disqus: true
---

If you use Oracle Real Application Clusters (RAC) you most likely also use Single Client Access Name (SCAN) addresses to connect to your DB. A SCAN address usually resolves to a number of IPs where each IP uses a dedicated SCAN listener. Now assume that there is no connectivity from your client's network to the SCAN listener's IPs, for example, due to network routing restrictions. However, you can access a node from your client's network that can connect to the SCAN listener's IPs. You setup a reverse proxy on such a node and you provide the SCAN address in the reverse proxy configuration. A client using the TNS protocol to connect to the DB gets redirected to a least utilised DB node with an IP address that cannot be accessed from the network of the client. And this causes a timeout connection error.

The following figure shows an example of this problem and how you can triage it. Let's say that your DB network is `192.168.10.0/24`, your client network is `10.100.20.0/24` and there is no connectivity between the two networks. You use a connection string `alice/password1@scan.your-domain.com:1521/service1` that works fine when you connect to the DB from the DB network, however, you cannot use the connection string from the client network. The address `scan.your-domain.com` resolves to `192.168.10.11`, `192.168.10.12` and `192.168.10.13` IPs. Finally, there is a node with IP `172.10.10.1` that both networks can access. 

<iframe id="swimlanes" style="border:none; width:100%; height:600px" scrolling="no" src="/swimlanes/embeded.html#dVJdb9owFH3Pr7iPEAkTR93WITGtg0mbNDURyeMk5No3xVqwqa8p9N/vugVBN3iLTs49Oh/OMnrqN/2WQBZCFoUoC1GMyxsYfQH3aN0e5KdSvP4TcgLaO4c6wvLwYb1bUgzWPS6zzPmIEzjqETpDoODEhIBPW6QI0R+0N8HvX2BLfH/Oe1OEPFe91TjeKKKdD0b+/kpaOfHit2Fk/FpZJ7RfT+SHUo4JwzOTZZ6zkX+NpzTpdCRBfmb04+0rfAp0NH9uKyD5/hkJ4gqhmd3dgzKGQUr+lYPOBs7yswbfnSi9pYgOAxMMdD7sVDBvCpd7sFFk2SVrVwa4b+p2Mb8W8eKUp6NrU+9h/g2cNwjvTdzwrSNdptwTGNzN54vvTTMd1IuqrWbVr2k7q4eDH1XTTvP8/WGeDwd1tWinaZzhEI4Ft9zEMT6nZhAeEmJs4HLQpE7+1wJ16LC36GJaxhoehqtUYGzXYUiww8jP5A/sVlavwBIkdaU1T2YfeoQu+PW5zIEv2Nxf#dVJNxf"></iframe>

You setup the nginx configuration is as follows.

```
stream {
    server {
        listen 1521;
        proxy_pass scan.your-domain.com:1521;
    }
}
```
  
The proxy will listen on `172.10.10.1:1521` and when you connect to the DB using the below command, you get the connect timeout error. 

```
sqlplus alice/password1@172.10.10.1:1521/service1

SQL*Plus: Release 21.0.0.0.0 - Production on Mon Apr 25 17:20:45 2022
Version 21.5.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

ERROR:
ORA-12170: TNS:Connect timeout occurred
```

In order to understand what is going on, you first check that you can open the TCP port from the client node, for example, by running `telnet 172.10.10.1 1521` which works fine. 

After that you enable `sqlplus` trace logging by adding the following configuration to the `sqlnet.ora` file that you need to place to the default Oracle network directory (note that you can change the location of this directory when you set an environment variable `TNS_ADMIN`). 

```
TRACE_LEVEL_CLIENT=USER
TRACE_FILENO_CLIENT=6
TRACE_FILELEN_CLIENT=51200
TRACE_UNIQUE_CLIENT=ON
TRACE_TIMESTAMP_CLIENT=ON
TRACE_DIRECTORY_CLIENT=/home/oracle/sqlplus/logs
LOG_DIRECTORY_CLIENT=/home/oracle/sqlplus/logs
DIAG_ADR_ENABLED=OFF
```

When you connect to the DB now using the sqlplus command, there will be trace logs generated in `/home/oracle/sqlplus/logs` directory. You can now see that after the initial connection to the SCAN IP, there is an exchange of `NSPTCN` and `NSPTRD` packets which attempts to redirect the client to an IP of a DB node (see [reasons of redirect packets](https://support.oracle.com/epmos/faces/DocContentDisplay?id=758145.1) for more details). Such node is however not accessible from the client network and you get the connect timeout error.  

```
[000001 25-APR-2022 17:01:31:905] nsopen: opening transport...
[000001 25-APR-2022 17:01:31:905] nttcni: Tcp conn timeout = 60000 (ms)
[000001 25-APR-2022 17:01:31:905] nttcni: trying to connect to socket 9.
[000001 25-APR-2022 17:01:31:905] nttcni: connected on source ipaddr 172.10.10.1 port 59318
[000001 25-APR-2022 17:01:31:906] nttctl: set TCP_NODELAY on 9
[000001 25-APR-2022 17:01:31:906] nsopen: transport is open
[000001 25-APR-2022 17:01:31:906] nsnainit: inf->nsinfflg[0]: 0x41 inf->nsinfflg[1]: 0x41
[000001 25-APR-2022 17:01:31:906] nsopen: global context check-in (to slot 0) complete
[000001 25-APR-2022 17:01:31:906] nscon: doing connect handshake...
[000001 25-APR-2022 17:01:31:906] nscon: connect id = 0x733c
[000001 25-APR-2022 17:01:31:906] nscon: sending NSPTCN packet
[000001 25-APR-2022 17:01:31:906] nscon: got NSPTRD packet
[000001 25-APR-2022 17:01:31:906] nscon: recving connect data
[000001 25-APR-2022 17:01:31:906] nsdo: 305 bytes from NS buffer
[000001 25-APR-2022 17:01:31:906] nscall: redirected
[000001 25-APR-2022 17:01:31:906] nstimarmed: no timer allocated
[000001 25-APR-2022 17:01:31:906] nsclose: closing transport
[000001 25-APR-2022 17:01:31:906] nsclose: global context check-out (from slot 0) complete
[000001 25-APR-2022 17:01:31:906] nscall: connecting...
[000001 25-APR-2022 17:01:31:906] nsc2addr: (ADDRESS=(PROTOCOL=TCP)(HOST=192.168.10.144)(PORT=1521))
[000001 25-APR-2022 17:01:31:906] nttbnd2addr: using host IP address: 192.168.10.144
[000001 25-APR-2022 17:01:31:906] nsopen: opening transport...
[000001 25-APR-2022 17:01:31:906] nttcni: Tcp conn timeout = 60000 (ms)
[000001 25-APR-2022 17:01:31:906] nttcni: trying to connect to socket 9.
[000001 25-APR-2022 17:02:31:960] nttcni: TImeout or Error on this socket
[000001 25-APR-2022 17:02:31:960] nserror: nsres: id=0, op=65, ns=12535, ns2=12560; nt[0]=505, nt[1]=0, nt[2]=0; ora[0]=0, ora[1]=0, ora[2]=0
[000001 25-APR-2022 17:02:31:960] nsopen: unable to open transport
[000001 25-APR-2022 17:02:31:960] nscall: connecting...
[000001 25-APR-2022 17:02:31:961] nioqper:  error from nscall
[000001 25-APR-2022 17:02:31:961] nioqper:    ns main err code: 12535
[000001 25-APR-2022 17:02:31:961] nioqper:    ns (2)  err code: 12560
[000001 25-APR-2022 17:02:31:961] nioqper:    nt main err code: 505
[000001 25-APR-2022 17:02:31:961] nioqper:    nt (2)  err code: 0
[000001 25-APR-2022 17:02:31:961] nioqper:    nt OS   err code: 0
[000001 25-APR-2022 17:02:31:961] niqme: reporting NS-12535 error as ORA-12535
[000001 25-APR-2022 17:02:31:961] niotns: Couldn't connect, returning 12170
```

If you now use the IP address of the DB node that the client is trying to redirect to in the nginx proxy configuration (in the example above it is `192.168.10.144`), all starts working fine as the client does not need to get redirected anymore.

Please note that Oracle Connection Manager (CMAN) provides more sophisticated option that you should use to setup a proxy for DB connections. The solution provided in this post is using a lightweight nginx configuration that you can easily setup, however, you loose High Availability features provided by Oracle RAC. From this reason you should only use this in testing or experimental environments. 
