---
title: "hRESTS: a Microformat for RESTful Services"
date: 2008-12-01T10:00:00+01:00
description: ""
slug: "hrests-microformat"
draft: false
---

Our work on hRESTS, [a microformat to describe RESTful services](/docs/WI2008-KopeckyGV.pdf) (co-authored by [Jacek Kopecky](http://www.jacek.cz), Karthik Gomadam and me) has been accepted to a Web Intelligence conference to be held in Sydney, Australia this year in December (the acceptance rate was around 18%). You can download the full paper [here](http://www.vitvar.com/doc/WI2008-KopeckyGV.pdf).

The value of today’s Web applications is no longer only in providing content to consumers but also in exposing functionality through public APIs designed for machine consumption. Typically, both Web applications and APIs today follow the Web architecture style called REST, and public APIs on the Web are often called “RESTful Web services”. The major problem with today’s RESTful APIs is that they are usually only described in a plain, unstructured HTML documentation useful only to a human developer. From this reason, finding suitable services, composing them (“mashing them up”), mediating between different data formats etc. are currently completely manual tasks.

hRESTS is a [microformat](http://en.wikipedia.org/wiki/Microformat) for machine-readable descriptions of Web APIs, backed by a simple service model. In general, a microformat is an approach for annotating human-oriented Web pages so that key information is machine-readable. On top of microformats, [GRDDL](http://en.wikipedia.org/wiki/GRDDL) is a mechanism for extracting RDF information from Web pages, particularly suitable for processing microformats. There are already microformats for contact information, geographic coordinates, calendar events, etc.

hRESTS uses a model adopting a Web principle of hypermedia allowing a web application to use hyperlinks for linking application’s pages that can be seen as a service. Obviously, not every web application can be considered as a RESTful service as it does not necessarily follow the REST architecture style. There are a lot of examples of badly designed RESTful architectures. We use RDF to represent the model that can be further extended with additional information such as WSMO-Lite service ontology.

In order to extract the meta-data from the annotated HTML document using hRESTS, one needs to know the hRESTS annotation mechanism. For this purpose and in accordance with GRDDL we also provide a XSLT stylesheet that extracts the meta-data in RDF from XHTML pages.

Once the hRESTS is used by RESTful service providers, one can easily build a focused search engine for RESTful services, for example by using [Yahoo! BOSS web search](http://developer.yahoo.com/search/boss/) in analogical way like BOSS web search can be used for e.g. searching LinkedIn public profiles annotated with [hResume microformat](http://microformats.org/wiki/hresume). We further plan to submit the hRESTS microformat to [microformats.org](http://microformats.org/) as well as build extensions towards semantic annotations which we call MicroWSMO.