---
title: "Monitor papers with a Google spreadsheet"
date: 2009-07-10T15:10:10+01:00
description: ""
slug: "monitor-papers-google-spreadsheet"
draft: false
---

Google Scholar is a great service which you can use to monitor citations of (your) papers. The major problem I have with Google Scholar, though, is that it does not expose any metadata about papers and citations. I have thus created a simple solution that allows you to extract papers’ titles and their citation counts and expose them as atom feed. And all what you need to do this is Google Spreadsheets.

See my [citation spreadsheet](http://spreadsheets.google.com/ccc?key=tnBz-2-6z9i8o5kxSpyIq3A&hl=en#) and a related [atom feed](http://spreadsheets.google.com/feeds/list/tnBz-2-6z9i8o5kxSpyIq3A/od4/public/basic) for more details. In case you want to have your own, just create a copy of it (File/Make a Copy), change the value for the name you want to retrieve citations for or change the Google Scholar URL as you like, and then share the sheet as Atom feed (Share/Publish as a Web Page and select the sheet and the ATOM format). After that just add the feed as a new subscription in your favorite feed reader. Note that the feed gets updated every 5 minutes.

