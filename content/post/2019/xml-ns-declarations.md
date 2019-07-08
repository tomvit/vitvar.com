---
title: "Namespaces Declarations Overhead"
date: 2019-05-25T10:00:00+01:00
description: ""
slug: "xml-ns-declarations-overhead"
draft: false
disqus: true
---

When I checked some of request or response messages of SOA services, I noticed that there are sometimes multiple declarations of the same namespaces on several elements in the response message's XML tree. This can make the message pretty big, sometimes by almost 30%. May be you do not need to bother as your messages are not big, however, there are SOA deployments where this can be an issue, for example, messages may include empty elements and it is not possible to optimise them. Such messages may reach the size of several megabytes. When you need to handle several hundreds of such messages per second, then you may think of alternative ways to optimise their size.

The problem is with the declaration of namespaces in XSLTs. I performed a test with JDeveloper IDE and discovered that when it generates XSLTs, it places a lot of namespaces on the ```xsl:stylesheet``` element. Since all namespaces are not always needed to be in the output XML, JDeveloper also lists all such namespaces' prefixes in the ```exclude-result-prefixes``` attribute of the ```xsl:stylesheet``` document.  

To cut the long story short, in order to have a namespace listed on the root element of the resulting XML document, you have to remove that namespace's prefix from the list of the ```exclude-result-prefixes``` attribute. Do not remove all namespaces in this attribute as otherwise you get all namespaces listed on the root element of the XML document. Only remove namespaces that you use in the transformation.

For example, XSL:

```xml
<xsl:stylesheet version="1.0" xmlns:ns0="http://some-uri-0" xmlns:ns1="http://some-uri-1" xmlns:xsl="http://some-uri-2"  
      exclude-result-prefixes="ns0 ns1 xsl">
  <xsl:template match="/">
    <ns0:root>
        <ns1:foo1>bar1</ns1:foo1>
        <ns1:foo2>bar2</ns1:foo2>
    </ns0:root>
  </xsl:template>
</xsl:stylesheet>
```

will produce the following XML:

```xml
<ns0:root xmlns:ns0="http://some-uri-0">
    <ns1:foo1 xmlns:ns1="http://some-uri-1">bar1</ns1:foo1>
    <ns1:foo2 xmlns:ns1="http://some-uri-1">bar2</ns1:foo2>     
</ns0:root>
```

And what you want is this XML that you should be able to achieve by having the ```exclude-result-prefixes="xsl"``` in the ```xsl:stylesheet``` element.

```xml
<ns0:root xmlns:ns0="http://some-uri-0" xmlns:ns1="http://some-uri-1">
 <ns1:foo1>bar1</ns1:foo1>
 <ns1:foo2>bar2</ns1:foo2>  
</ns0:root>
```
