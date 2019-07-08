---
title: "SFTP probe with no PID"
date: 2019-06-02T10:00:00+01:00
description: ""
slug: "sftp-probe-no-pid"
draft: false
disqus: true
---

There is no ideal world where all integrations use HTTP protocol. HTTP alone that SOAP services use (or even better REST) bring many advantages across the stack. Having said that, there are cases when a certain integration uses other protocols, for example, SFTP to upload a file to a remote server. And there is Enterprise Service Bus that acts as a message broker mixing and matching various protocols that your enterprise integration requires. 

I recently faced an issue with exhausted connections on a SSH server which limit was set by the default value of ```MaxStartups``` parameter ```10:30:100```. This means that there is a maximum number of 10 unauthenticated connections before SSH daemon starts dropping them, a probability of 30% that a connection would be dropped when reaching this limit, and any connection beyond 100 would fail immediately. ESB typically runs in a clustered setup while there is a certain number of threads that can run the upload operation. 


In the above setup, the total number of connections was less than the ```MaxStartups``` limit while it was clear that there is another process that makes connection attempts and eventually causing the connection limit to be exceeded. From SSH logs I found that there is a client IP address that does not belong to any of the ESB cluster nodes and it was also possible to see that connection attempts come at intervals of one second from the same IP. Moreover, there was an established connection on the box with that IP address.

```bash
neptun:/home/oracle $ sudo netstat --program --numeric-hosts --numeric-ports --extend | grep "10.10.10.5"
tcp        0      0 192.168.10.1:14792       10.10.10.5:22            ESTABLISHED root       -   
```

So there was a probe running against the SSH server every second, however, it was not very obvious to identify the process running the probe. Any attempt to capture the PID that the established connection holds failed. The reason was that the process was already dead at the time of capturing the socket. 

My assumption was that the process must be running as a bash script and is using sleep command to always wait 1 second. When a script calls sleep, a sub-process is created, so I looked at the process hierarchy and found this one:
 
```bash
$ ps -ejH 
32790 32790 32630 ?        01:22:39   sh
53818 32790 32630 ?        00:00:00     sleep 
```

Then I checked open files of the process 32790 and voila:

```bash 
neptun:/home/oracle $ sudo ls -l /proc/32790/fd
total 0
lrwx------ 1 root root 64 Dec 14 01:44 0 -> /dev/pts/3 (deleted)
lrwx------ 1 root root 64 Dec 14 01:44 10 -> /dev/pts/3 (deleted)
lrwx------ 1 root root 64 Dec 14 01:44 11 -> /dev/pts/3 (deleted)
l-wx------ 1 root root 64 Dec 14 01:44 2 -> /opt/probe/telnet-op
lr-x------ 1 root root 64 Dec 14 01:44 255 -> /opt/probe/telnet.sh
```
  
And the answer is:
 
```bash 
neptun:/home/oracle $ cat /opt/probe/telnet.sh
while sleep 1; do echo "quit" | telnet pluto 22; done 2>&1 >/dev/null
```
    