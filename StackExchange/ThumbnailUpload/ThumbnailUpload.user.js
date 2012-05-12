// ==UserScript==
// @name Thumbnail Uploader
// @version 0.0.1
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Allows uploading of linked thumbnails for images
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*.stackexchange.com/*
// @include http://*.stackoverflow.com/*
// @include http://*.stackapps.com/*
// ==/UserScript==


(function(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/MathJaxButtonsSites.js?rand="+d.getMonth()+""+d.getDay();
     if(localStorage.ManishEarthScript){
       script.src=localStorage.ManishEarthScript;
     }
     document.body.appendChild(script);
})();
