// ==UserScript==
// @name Transmogrify Offtopic button
// @version 1.0.1
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Allows one to respond to offtopic MSO programming questions with a Calvin and Hobbes strip
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://meta.stackoverflow.com/questions/*

// ==/UserScript==


(function(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/TransmogrifyOffTopic.js?rand="+d.getMonth()+""+d.getDay();
     document.body.appendChild(script);
})();
