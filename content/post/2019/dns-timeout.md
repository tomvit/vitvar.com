---
title: "Service Outbound Call and DNS Resolver Timeout"
date: 2019-06-25T10:00:00+01:00
description: ""
slug: "service-call-resolver-timeout"
draft: false
disqus: true
---

In order to maintain your integration platform's resilience, you should have timeouts on your services' outbound calls. When you do, any long running outbound service call won't block your threads. And it is important to have enough threads in your thread pool at any point in time as otherwise your integration middleware may be blocked and process no requests. 

You should be able to set two kinds of timeouts on your outbound HTTP service calls, namely ***HTTP connect timeout*** and ***HTTP read timeout***. When your service's endpoint contains a hostname, a time to resolve the hostname to an IP address counts against the HTTP connect timeout. Operating system usually has two DNS servers configured in ```/etc/resolv.conf```, one primary and one secondary. The secondary server is a failover server when a name resolution request to the primary fails or timeouts. However, most of ```resolv.conf``` configurations do not define timeouts to failover to the secondary server, which may cause problems in upper layers of the stack. 

Consider the following scenario:

1. There is a HTTP connect timeout towards a downstream service endpoint which is set to 5 seconds. 

2. Your server tries to establish a connection with a hostname from your downstream service's endpoint. The server tries to resolve the hostname to an IP address by calling the resolver.

3. When the primary server is down, the resolver will failover to the secondary one as per the timeout and a number of attempts configuration. As there is no explicit setting, the resolver will use [default values of 5 seconds and 2 attempts](http://man7.org/linux/man-pages/man5/resolver.5.html). A single hostname resolution will thus take at least 10 seconds. 

4. Since the connect timeout of 5 seconds is less than the failover timeout of 10 seconds, the call to the downstream service will fail on connect timeout. 

You will most likely only see a connect timeout message in your server logs leaving you with your full stack investigation to understand the root cause of this issue.  

