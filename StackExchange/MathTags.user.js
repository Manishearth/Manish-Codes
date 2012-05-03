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





//Some functionality copied from https://gist.github.com/2583075

function AddKbdShortcuts ($) {
    $("textarea.wmd-input").each (AddKbdButtonAsNeeded);

    //.on() not working right!!
    $("textarea.wmd-input").live ("focus",   AddKbdButtonAsNeeded);
    $("textarea.wmd-input").live ("keydown", InsertKbdTagByKeypress);
    $("li.wmd-kbd-button") .live ("click",   InsertKbdTagByClick);

    /*------------*/
    function AddKbdButtonAsNeeded () {
        var jThis   = $(this);
        if ( ! jThis.data ("hasKbdBttn") ) {
            //--- Find the button bar and add our button.
            var btnBar  = jThis.prevAll ("div.wmd-button-bar");
            if (btnBar.length) {
                //--- The button bar takes a while to AJAX-in.
                var bbListTimer = setInterval ( function() {
                        var bbList  = btnBar.find ("ul.wmd-button-row");
                        if (bbList.length) {
                            clearInterval (bbListTimer);
                            bbList.append (
                                  '<li class="wmd-button wmd-kbd-button" '
                                + 'title="Keyboard tag &lt;kbd&gt; Alt+K" '
                                + 'style="left: 380px;">'
                                + '<span style="background: white;">[kbd]</span></li>'
                            );
                            jThis.data ("hasKbdBttn", true);
                        }
                    },
                    100
                );
            }
        }
    }

    function InsertKbdTagByKeypress (zEvent) {
        //--- On Alt-K, insert the <kbd> set. Ignore all other keys.
        if (zEvent.altKey  &&  zEvent.which == 75) {
            InsertKbdTag (this);
            return false;
        }
        return true;
    }

    function InsertKbdTagByClick (zEvent) {
        //--- From the clicked button, find the matching textarea.
        var targArea    = $(this).parents ("div.wmd-button-bar")
                        .nextAll ("textarea.wmd-input");

        InsertKbdTag (targArea[0]);
        targArea.focus ();
        try {
            //--- This is a utility function that SE currently provides on its pages.
            StackExchange.MarkdownEditor.refreshAllPreviews ();
        }
        catch (e) {
            console.warn ("***Userscript error: refreshAllPreviews() is no longer defined!");
        }
    }
 function InsertKbdTag (node) {
        //--- Wrap selected text or insert at curser.
        var oldText         = node.value || node.textContent;
        var newText;
        var iTargetStart    = node.selectionStart;
        var iTargetEnd      = node.selectionEnd;

        if (iTargetStart == iTargetEnd)
            newText         = '<kbd></kbd>';
        else
            newText         = '<kbd>' + oldText.slice (iTargetStart, iTargetEnd) + '</kbd>';

        //console.log (newText);
        newText             = oldText.slice (0, iTargetStart) + newText + oldText.slice (iTargetEnd);
        node.value          = newText;
        //-- After using spelling corrector, this gets buggered, hence the multiple sets.
        node.textContent    = newText;

        //-- Have to reset selection, since we repasted the text.
        node.selectionStart = iTargetStart + 5;
        node.selectionEnd   = iTargetEnd   + 5;
    }

