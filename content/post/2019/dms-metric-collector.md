---
title: "Weblogic DMS Metric Collector"
date: 2019-01-18T10:00:00+01:00
description: ""
slug: "weblogic-dms-metric-collector"
draft: false
disqus: true
---

I often need to evaluate performance of Weblogic apps, components and services and I use Weblogic Dynamic Monitoring Service that provides a massive amount of sensors. You can access DMS in a number of ways, such as Weblogic Scripting Tool (WLST), Java API or DMS Spy application. As it was a cumbersome process to always craft a Java program to retrieve a metric from DMS, I thought it would be much easier to retrieve metrics directly via DMS Spy app by using a command line utility just by saying which metrics from which DMS table you need.  

DMS Spy app provides user interface to access DMS metric tables while it also provides endpoints to retrieve metric tables in a XML format. I developed [dms-collector](https://github.com/tomvit/dms-collector), a python utility that retrieves a selected metric on regular time intervals and a specified number of times and produces data in a CSV format on standard output. For example, in order to retrieve metrics from ```JDBC_DataSource``` DMS table, you can specify the command as follows.

```bash
dms-collector --count 10 --delay 30 --url http://localhost:7031 --connect weblogic/password --table JDBC_DataSource
```

There are two kinds of metric tables in DMS, tables that provide metrics updated regularly from managed servers in the cluster and so called ***rollup tables*** that contain aggregated values since the last time DMS was reset. The rollup tables play a very important role in my performance evaluation tasks as there are details such as BPEL activities counts and processing times which I use to understand individual BPEL invocation activities performance. And you can use dms-collector to run DMS reset operation too.  

## DMS Spy API?

DMS Spy does not provide API for a third-party app access. However, it provides endpoints that you can handle as REST resources and that represent metric tables and data in XML. The below is an example resource URL path that points to a metric table ```JDBC_DataSource```.

```bash
/dms/Spy?format=xml&table=JDBC_DataSource&value=true&cached=false
```

Despite the availability of resources, the interaction between a python client and DMS Spy requires a HTML form-based user authentication and a cookie to be passed on every request to access a DMS Spy resource. This is possible to handle in Python by following the authentication protocol and respective URLs that DMS Spy provides to access the desired resources. The below code shows the details.

```python
# login to Dms by using login form
def DmsLogin():
    headers   = { "User-Agent" : "dms-collector/%s"%VERSION }
    logindata = {"j_username" : username, "j_password" : password, "j_character_encoding" : "UTF-8" }
    r = requests.request("POST",DMSLOGIN_URL%(args.url),headers=headers,data=logindata,allow_redirects=False)
    if r.status_code==302 or r.status_code==303:
        loc=r.headers["Location"] if r.headers.get("Location") is not None else None
        cookie=r.headers["Set-Cookie"] if r.headers.get("Set-Cookie") is not None else None
        if loc is not None and cookie is not None:
            if not("loginForm" in loc):
                # success login
                return cookie
        # // if all headers present
    # // if redirection
    
    # failed login
    return None
# // DmsLogin
```

