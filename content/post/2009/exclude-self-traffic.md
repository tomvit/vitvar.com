---
title: "Exclude Self-traffic from your Website’s Access Reports"
date: 2009-01-13T21:13:35+01:00
description: "excluding traffic from your web"
slug: "exclude-self-traffic-from-your-web"
draft: false
---

I use Google Analytics to track my website’s traffic and I do not want my own traffic to be included in the reports. 

Google Analytics comes with two suggestions how to do this, however, neither of them is suitable for me. The first option is to exclude all traffic based on one or more IPs. I can set a filter to exclude a traffic from my work as well as home networks, however, this would also exclude the traffic from anyone sitting on the same network. The other option is to set a cookie variable on all pages you want to exclude and create a filter based on that variable. This option is not any better as I would need to always set such a variable on every new page I create, that is, call a specific javascript method when page is loaded, deploy the page to my web server, access the page to set the cookie for my own access, and then remove the javascript method call and redeploy the new page for public access.

Fortunately, there is a better solution. First, I create a custom variable in the Firefox configuration settings called `general.useragent.extra.private` and set its value to `my_agent` (use your own unique identification, type `about:config` in your browser’s address bar to create and set such variable). This will add the `my_agent` string to the browser’s agent identification that you can read from within the javascript in the browser by userAgent property of the navigator object (`navigator.userAgent`). After that you can just add a simple condition to your page’s javascript code that calls Google Analytics methods to track your page’s traffic:

```html
<script type="text/javascript">
    // track if not me
    if (navigator.userAgent.indexOf('my_agent') == -1) {
        var pageTracker = _gat._getTracker("UA-xxx");
        pageTracker._trackPageview();
    }
</script>
```
