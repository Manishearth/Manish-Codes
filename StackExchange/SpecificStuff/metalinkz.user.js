// ==UserScript==
// @name           Meta links....they're everywhere!!!
// @namespace      Manishearth
// @description    Adds 'meta', 'chat', 'faq', and 'about' links to SE sites when you're logged out
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @exclude        http://chat.*/*
// @exclude        http://meta.*/*
// @exclude        http://discuss.*/*
// @author         Manish Goregaokar

// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
if($('#hlinks-custom a:contains(meta)').length==0){
links='<a href="http://chat.'+document.location.host+'">chat</a><span class="lsep">|</span><a href="http://meta.'+document.location.host+'">meta</a><span class="lsep">|</span><a href="/about">about</a><span class="lsep">|</span><a href="/faq">faq</a>'
$('#hlinks-custom').html(links)
}
});


