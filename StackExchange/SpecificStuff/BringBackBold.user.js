// ==UserScript==
// @name           Bring Back Bold!
// @namespace      Manishearth
// @description    Brings back the bold reputation counter/post scores!
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
    $('.vote-count-post strong').css({'font-weight':'bold'});
    $('.status strong').css({'font-weight':'bold', 'font-size':'24px'});
    $('.vote .vote-count-post').css({'font-weight':'bold','font-size':'30px'});
    $('.reputation-score').css({'font-weight':'bold','font-size':'120%'});
    $('.mini-counts').css({'font-weight':'bold','font-size':'24px'});
    $('#tabs a').css({'font-weight':'bold'});
    $('span.relativetime').css({'font-weight':'bold'});
    $('.item-multiplier span').css({'font-weight':'bold', 'font-size':'15px'});
});
