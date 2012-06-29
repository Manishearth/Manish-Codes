// ==UserScript==
// @name Share buttons
// @version 0.0.1
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Allows uploading of linked thumbnails for images
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.askdifferent.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// @exclude       http://*/reputation
// ==/UserScript==
function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};

with_jquery(function($){

$('.share-tip:not(:has(.shareButtons))').live('mouseover',function(){

var shareButtons='<div class=shareButtons><div id="promo-icon-wrapper"><a href="mailto:?subject=%%SUBJECT%%;body=%%BODY%%" id="promo-email" title="share link to this site via email" style="width: 16px;height: 16px;display: inline-block;margin: 0;background-position: -54px -444px;">Email</a>&nbsp;&nbsp;<a href="http://api.addthis.com/oexchange/0.8/forward/facebook/offer?url=%%URL$$&title=%%SUBJECT%%" id="promo-facebook" title="share link to this site on Facebook" style="width: 16px;height: 16px;margin: 0;display: inline-block;background-position: 0 -444px;">Facebook</a>&nbsp;&nbsp;<a href="http://api.addthis.com/oexchange/0.8/forward/twitter/offer?url=%%URL%%&title=%%BODY%%&template=%7B%7Btitle%7D%7D%20%7B%7Burl%7D%7D" id="promo-twitter" title="share link to this site on Twitter" style="width: 16px;height: 16px;display: inline-block;margin: 0;background-position: -36px -444px;">Twitter</a>&nbsp;&nbsp;<a href="https://plus.google.com/share?url=%%URL%%" id="promo-gplus" title="share link to this site on Google+" style="width: 16px;height: 16px;display: inline-block;margin: 0;background-position: -18px -444px;">Google+</a></div></div>';
$(shareButtons.replace(/\%\%SUBJECT\%\%/ig,"Check out this post!").replace(/\%\%BODY\%\%/ig,"").replace(/\%\%URL\%\%/ig,$(this).find('input')[0].value)).find('div a').css({'background-image': "url('http://cdn.sstatic.net/beta/img/sprites.png?v=3/beta/img/sprites.png?v=3')",
'background-repeat': 'no-repeat',
'overflow': 'hidden',
'background-color': 'transparent',
'text-indent': '-999em'}).end().insertAfter($(this).find('input'));

});

});
