// ==UserScript==
// @name RealTimeFlood
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Saves you from clicking the "Load xyz comments" and "Show new posts" buttons
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/*
// @include http://*superuser.com/*
// @include http://*serverfault.com/*
// @include http://*stackexchange.com/*
 
 
// ==/UserScript==



 function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
 };
 
 
 with_jquery(function($){
 
 setInterval(function(){
 $("#new-post-activity").click()
 $('.comments-link[title^=expand]').click()
 
 },1000);
 
 
 });