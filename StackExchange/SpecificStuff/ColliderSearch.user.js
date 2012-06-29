// ==UserScript==
// @name Super Multicollider Dropdown™ Search
// @version 0.0.2
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
$('#seWrapper:not(:has(#siteSearchBox))').live('mouseover',
function(){$('.seNavLinks').append('<input type=text id=siteSearchBox style="margin:0px 0px 0px 5px;font-size:8px">');
$('#siteSearchBox').bind('keyup',function(){
var that=this.value.toLowerCase();
$('.seContainer .itemBox,.seContainer .noticeBox').hide();
$('.seContainer .itemBox,.seContainer .noticeBox').filter(function(){
if($(this).find('.siteInfo p:not(.inboxSummary)')[0].textContent.toLowerCase().indexOf(that)!=-1||$(this).find('a')[0].href.indexOf(that)!=-1){
return true;
}
return false;

}).show();

});

});
});
