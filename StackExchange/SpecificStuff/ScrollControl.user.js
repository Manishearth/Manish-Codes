// ==UserScript==
// @name           Scroll Control
// @namespace      Manishearth
// @description    Allow you to control an SE tab via the mouse wheel. Useful for when you want to refresh/close tabs in the background
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://meta.answers.onstartups.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/proposals/*
// @exclude        http://chat.*/*
// @author         Manish Goregaokar

// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
   $('<div id=ScrollCap>⟳</div>').css({position:"absolute","border-radius":"10px",top:0,left:0,width:"20px",height:"20px","z-index":10,"background-color":"white",opacity:0.5}).appendTo('body');document.getElementById('ScrollCap').onmousewheel=function(e){if(e.wheelDelta>0){document.location.reload(true);}else{var objWindow = window.open(location.href, "_self"); objWindow.close();}return false;}

});
