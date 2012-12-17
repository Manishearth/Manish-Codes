// ==UserScript==
// @name           IPA Keyboard
// @namespace      Manishearth
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @description    IPA Keyboard for Linguistics.SE
// @include        http://linguistics.stackexchange.com/*
// @author         Manish Goregaokar

// ==/UserScript==


(function(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/Extensions/IPAKeyboard/IPAKeyboardNS.js?rand="+d.getMonth()+""+d.getDay();
     document.body.appendChild(script);

})();
