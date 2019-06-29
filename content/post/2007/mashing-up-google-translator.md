---
title: "Mashing-up with Google Translator"
date: 2007-10-10T15:00:00+01:00
description: ""
slug: "mashing-up-google-translator"
draft: false
---

Have you ever though about your website or blog to be in multiple languages? Although the language that most people speak is English there might be people who would like to read your web in Russian or Chinese.

Google (as well as some others) provide language tools allowing to translate any text or a website in a particular language to a number of other languages. However, if you want to make your site directly multilingual using these tools, you want to put the translate links directly to your website and customize the translation parameters. This is not as straightforward as one would expect. Also, when you supply the URL to the Google translator you get the entirely browsable website in the other language, however, there is always this annoying banner on the top of each page: “this page was automatically translated from…”. If you want to see how this works for my website, just go to the bottom of this page and clink on one of the flag images.

For example, for a website in English the following code enables the German language link where you place it.

```html
<form action="http://www.google.com/translate_p">
  <script language="javascript">
     var u = location.href;
     var r = new.RegExp("u=(.*)", "");
     if (r.test(location.href)) {
        r = r.exec(location.href);
        u = RegExp.$1;
     }
     document.write ("<input name='u' value="+u+"
        type='hidden'>")
  </script>
  <input name="hl" type="hidden" value="en">
  <input name="ie" type="hidden" value="UTF8">
  <input name="langpair" type="hidden" value="">   

  <!- language links from English to other languages ->
  <input id="flag" name="langpair" 
     onclick="this.form.langpair.value=this.value"
     src="url/to/german/image/flag" 
     title="German" 
     type="image"
     value="en|de">
  <!--- other language links go here --->
</form>
```

To place other language links just add other input elements with id “flag” and change src attribute for the image of the flag, title for the language name, and value in a form “en|lang” where lang is the language code (“de” for German, “it” for Italian, “es” for Spanish and so on).

The reason why you need to use the JavaScript code is that when you click the German language link and the page is translated, you get the new page URL as something like

```html
http://66.249.91.104/translate_c?hl=en&langpair=en%7Cde&u=http://mywebsite.com/
```

When the page is loaded the script extracts the real URL of your page and creates a parameter with name “u” with the value of proper URL of your page. This is necessary for subsequent clicks on the language links so that the real URL of your page is passed to the Google translator.

The only problem remains with the translation itself. The Google translator translates everything which appears in the page. It would be very handy if the translation tool recognizes a special markup preserving the original text in the original language (such as names).
