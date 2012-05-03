// ==UserScript==
// @name            Math Buttons
// @namespace       StackExchange
// @description     Adds math,chem, and SI shortcuts to SE 
// @match           http://*.askubuntu.com/*
// @match           http://*.onstartups.com/*
// @match           http://*.serverfault.com/*
// @match           http://*.stackapps.com/*
// @match           http://*.stackexchange.com/*
// @match           http://*.stackoverflow.com/*
// @match           http://*.superuser.com/*
// ==/UserScript==

//Currently does nothing.
//Some functionality copied from https://gist.github.com/2583075



//Use this as well:
function addbutton(text,callback,identify,pic){
//Callback must take id of textarea as argument.
$.each($('.wmd-container').not(".canhasbutton"+identify),function(){
try{
tid=$(this).find("[id^=wmd-input]")[0].id;
row=$(this).find("[id^=wmd-button-row]")[0];
lastel=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
if(lastel.length>0){
px=parseInt(lastel[0].style.left.replace("px",""))+25;
//add code for background-position of span as well later
btn='<li class="wmd-button" style="left: '+px+'px; " onclick="'+callback+'(\''+tid+'\')"><span style="background-image:url('+pic+');">'+text+'</span></li>';
$(btn).insertAfter(lastel);
}
this.className+=" canhasbutton"+identify;
}catch(e){}
})
}








function keyPressEventLambda(key,callback){
return function (zEvent) {
        //--- On Alt-K, insert the <kbd> set. Ignore all other keys.
        if (zEvent.which == key) {
            callback(this);
            return false;
        }
        return true;
}
}

function clickButtonEventLambda(left, right){
 return function (tid) {
	 
	 	node=$('#'+tid)[0];
		try{
        //--- Wrap selected text or insert at curser.
        var oldText         = node.value || node.textContent;
        var newText;
        var iTargetStart    = node.selectionStart;
        var iTargetEnd      = node.selectionEnd;

        if (iTargetStart == iTargetEnd)
            newText         = left+right;
        else
            newText         = left + oldText.slice (iTargetStart, iTargetEnd) + right;

        //console.log (newText);
        newText             = oldText.slice (0, iTargetStart) + newText + oldText.slice (iTargetEnd);
        node.value          = newText;
        //-- After using spelling corrector, this gets buggered, hence the multiple sets.
        node.textContent    = newText;
		debugger;
        //-- Have to reset selection, since we repasted the text.
        node.selectionStart = iTargetStart + left.length;
        node.selectionEnd   = iTargetEnd   + right.length+left.length-1;
			node.focus ();
        try {
            //--- This is a utility function that SE currently provides on its pages.
            StackExchange.MarkdownEditor.refreshAllPreviews ();
        }
        catch (e) {
            console.warn ("***Userscript error: refreshAllPreviews() is no longer defined!");
        }
		}catch (e) {
            console.warn ("***Textarea does not exist");
			console.log(e);
        }
    }


}
SIify=clickButtonEventLambda("\\:\\mathrm{","}")
dollarify=clickButtonEventLambda("$","$")
chemify=clickButtonEventLambda("\\ce{","}")
addbutton("SI","SIify","SI","");
addbutton("$","dollarify","dollar","");
addbutton("O<sub>2</sub>","chemify","chemify","");