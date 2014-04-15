// ==UserScript==
// @name           Bring Back Bold!
// @namespace      Manishearth
// @description    Brings back the bold reputation counter/post scores!
// @include        http://meta.stackoverflow.com/*
// @author         Manish Goregaokar
// @author         nhahtdh

// ==/UserScript==
// See http://meta.stackoverflow.com/questions/158762/whats-up-with-the-new-css

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function ($) {
 $('[rel=stylesheet]')[0].href="https://dev.stackoverflow.com/content/stackexchangemeta/all.css";
});
