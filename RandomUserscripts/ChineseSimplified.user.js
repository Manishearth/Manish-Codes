// ==UserScript==
// @name Stay in Simplified Chinese
// @version 1.0.0
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Make Chinese Wikipedia stay in simplified chinese
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://zh.wikipedia.org/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){
var re=new RegExp("zh.wikipedia.org\\/wiki\\/","g")
$('a').each(function(){
    this.href.replace(re,"zh.wikipedia.org/zh-cn/")
    
});
});
});
