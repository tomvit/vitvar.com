---
title: "Inline swimlanes.io declarations in Hugo"
date: 2022-04-27T18:00:00+01:00
description: "swimlanes.io, sequence diagrams, hugo, shortcode"
slug: "inline-swimlanes-io-declaration-hugo"
draft: false
disqus: true
---

I often need to embed a simple sequence diagram on a page and I came across [swimlanes.io](https://swimlanes.io) which does exactly what I need. You can define a sequence diagram, download an image or embed a diagram into a page. I like the simplicity of swimlanes.io language, however, I sometimes need to make a slight modifications to my sequence diagram, for example, highlighting a specific part of it by changing a color of a line, etc. And I want to write a code of my sequence diagram directly in Hugo's page without going to swimlanes.io to change it.

To do this, I developed a [Hugo shortcode for swimlanes](https://github.com/tomvit/vitvar.com/blob/master/themes/curvytech/layouts/shortcodes/swimlanes.html) and slightly altered [the swimlanes code](https://github.com/tomvit/vitvar.com/tree/master/themes/curvytech/static/swimlanes) to be able to embed a diagram using a base64 string. I also modified the diagram style to match my Hugo theme. 

The following example shows how I use in Hugo.   

```
{{</* swimlanes */>}}
note: Example request-response interaction between a client and a server via a proxy
client -> proxy: request
proxy -> server: forwarded request  
server -> proxy: response 
proxy -> client: response 
{{</* /swimlanes */>}}
```

This produces the below diagram. 

{{% swimlanes id="swimlanes_1" height="350px" %}}
note: Example request-response interaction between a client and a server via a proxy
client -> proxy: request
proxy -> server: forwarded request  
server -> proxy: response 
proxy -> client: response 
{{% /swimlanes %}}

The reason why I had to modify the original code was that I need to provide a sequence diagram declaration as a base64 string, however, swimlanes uses a modified version of base64 encoding algorithm that I cannot use in Hugo (I believe that the reason for this was to reduce a string size that swimlanes loads from the URL's hash).

As I host the swimlanes code, I can now modify a resulting sequence diagram style by using jQuery. For example, I can change a color of a line or text to highlight a specific part of a diagram or hide a part of it. 

{{% swimlanes id="swimlanes_2" height="230px" %}}
client -> proxy: request
...: 
client -x server: a direct request to the server will **timeout** 
{{% /swimlanes %}}

<script>
  document.getElementById('swimlanes_2').onload = ()=>{
    var c = $("#swimlanes_2").contents()
    c.find('#element_2 polyline').css("stroke","red")
    c.find('#element_2 div').css("border-color","red")
    c.find(".lane-titles.bottom").css("display", "none")
  }
</script>

I do this by modifying the style of the diagram in JavaScript. You can modify any part of it, however, you need to explore the html code of the diagram and find correct element IDs to do so. 

```javascript
document.getElementById('swimlanes_2').onload = ()=>{
  var c = $("#swimlanes_2").contents()
  c.find('#element_2 polyline').css("stroke","red")
  c.find('#element_2 div').css("border-color","red")
  c.find(".lane-titles.bottom").css("display", "none")
}
```



  
