---
title: "SOA Service Multithreading Problem"
date: 2019-07-08T10:00:00+01:00
description: "soa, oracle, bpel, embedded java, multithreading"
slug: "soa-service-multithreading-problem"
draft: false
disqus: true
---

When you develop your SOA services, you usually use a language such as BPEL (Business Process Execution Language) to implement a service orchestration logic. BPEL is a powerful language to implement any control flow logic you like as well as call downstream services by using SOAP or REST interfaces. It also gives you an opportunity to call a custom function developed in Java provided by a bespoke class loaded in your SOA platform. And it is important that you understand how threads will be allocated to run your service instances. 

BPEL code when translated to executable code is well optimised to deal with any multithreading issues, however, when you call your custom function then you need to be aware of multithreading, i.e. when multiple service instances call your Java custom code. You need to take care of shared variables and avoid race conditions. It is also important to understand how your code behaves under load.

## Example Scenario

The below scenario shows a situation in a specific settings when under a heavy load, a badly implemented multithreading in a custom Java implementation blocked the whole SOA server.

![Service Multithreading Problem example](https://docs.google.com/drawings/d/e/2PACX-1vTN-dKeoKCeU9raKOG7RsqTCOO0TmwunQ6Hy-0o1Yso5-TbDu-rWPPNx9eZEWBsnn5uZy2V4J1SMZMN/pub?w=750#center-wide "Service Multithreading Problem Example")

In the scenario, there is a SOA service with BPEL code and embedded Java that calls ```getToken``` method provided by a bespoke Java class. The method eventually calls an external Token service. Note that you could implement such integration by using BPEL invoke activity, however, in some situations you need to implement an advanced logic around such integration that is not possible to do in BPEL. For example, you need to store results of outbound service calls in a shared memory and reuse them across multiple service instances. 

When a client calls your SOA service, the SOA server allocates a new thread from its thread pool and uses the thread to process the request. The code calls ```getToken``` method and enters a ```synchronized``` code block which in turn creates an object-level lock. The method eventually calls the external Token service and as the sequence diagram shows, this call is blocked due to an issue in the external application. Although the outbound call uses the HTTP read timeout, the thread only releases the lock after the timeout occurs, i.e. after 30 seconds. 

Now imagine that your SOA service operates under a high load of 150 requests per second. Since in 30 seconds (the timeout value) there can be up to 4500 requests, there will be a pileup of threads waiting in a queue to enter the ```synchronized``` code block. A single thread that enters the queue could wait up to ```N*WT``` seconds, where ```N``` is the number of threads in the queue, and ```WT``` is the thread waiting time, i.e. 30 seconds. For example, for ```N=300```, the thread waiting time is theoretically 2.5 hours. You however need to understand that the thread usually cannot run for more than a small number of minutes as there are other constraints in the SOA server that may result in destroying its running context. When the number of threads that can serve your SOA service's requests is unlimited, the thread pool will be soon saturated (in fact, with 150 requests per second, the thread pool will be saturated in 3-4 seconds). And when the thread pool is used to serve other SOA services, your SOA server will stop serving requests.

## Corrective Actions

There are several corrective actions you can do to improve the situation described in the example. I list them here with no particular order but you should consider them all and if possible apply them whenever you can. However, some of the actions may not be possible to follow due to technological or organisational constraints you may have. Note that the goal of the corrective actions is to bring your SOA server under control.

1. *Timeouts.* It is important to have good timeouts on your outbound service calls. You need to calculate the timeouts with respect to other constraints and requirements you may have (e.g. JTA transaction timeout, BPEL synchronous process timeout, etc.). In the example, if you decrease the timeout from 30 seconds to say 5 seconds, you can improve the performance, however, the pile up of threads in the queue would still be high: 750 threads before the first thread leaves the queue gives you the thread waiting time of 62 minutes! This is still not acceptable but gives you an idea how timeouts impact the performance.

2. *Throttling.* Whenever you need to limit inbound service calls in order to accommodate your SLA, you should define constraints around how many maximum service instances can be running at any point in time. This allows you to control resources that you are able to allocate to serve your service requests while satisfying your clients' needs. In the example, inbound throttling would limit number of threads that can run your service and would eventually be blocked when waiting in the queue. Although the SOA service performance would not be impacted, the SOA server would have available resources to respond to other services' requests. If your SOA server is not capable of defining service-level throttling constraints, you may want to implement your own inside your bespoke Java class.      

3. *Multithreading.* When possible, you should use standard capabilities of your SOA platform to achieve your integration needs. If from any reason you have to develop your custom Java method and call it from within BPEL process, you should take multithreading seriously. In general, object-level locking is not a good practice as it locks all ```synchronized``` methods, i.e. also methods that may be unrelated and share no data. There are many guides to follow when you want to learn how to deal with multithreading. In the example, if multithreading was implemented correctly such as threads were not blocked, there would be parallel requests running against the downstream service. And it would be responsibility of the downstream service to deal with such situation, for example, having inbound throttling in place. When a number of requests reaches its limit, all other requests would fail which in turn would make your SOA service to fail. Such failures are obviously correct ends of your SOA service instances, however, you should also have an appropriate error handling in place.  
