// ==UserScript==
// @name MathJax buttons
// @version 2.2.2
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds math buttons to the SEeditor, including a "$" button, a "$$" button, an SI-unit-ify button (on science sites), and a "\ce{}" button on chem.SE
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*.stackexchange.com/*
// @include http://*mathoverflow.net/*
// @exclude http://chat.stackexchange.com/*
// ==/UserScript==


//Some functionality copied from https://gist.github.com/2583075. Thanks, Brock.

(function(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/MathJaxButtonsSites.js?rand="+d.getMonth()+""+d.getDay();
     document.body.appendChild(script);
})();
