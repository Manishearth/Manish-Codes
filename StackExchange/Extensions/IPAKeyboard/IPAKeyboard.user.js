// ==UserScript==
// @name           IPA Keyboard
// @namespace      Manishearth
// @description    IPA Keyboard for Linguistics.SE
// @include        http://linguistics.stackexchange.com/*
// @author         Manish Goregaokar

// ==/UserScript==


//Some functionality copied from https://gist.github.com/2583075. Thanks, Brock.

(function(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/Extensions/IPAKeyboard/IPAKeyboard.js?rand="+d.getMonth()+""+d.getDay();
     document.body.appendChild(script);
      var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", "https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/Extensions/IPAKeyboard/IPAKeyboard.css?rand="+d.getMonth()+""+d.getDay())
  document.head.appendChild(fileref)
})();
