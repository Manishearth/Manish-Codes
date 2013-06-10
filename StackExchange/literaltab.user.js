// ==UserScript==
// @name Literal tab in edit box
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Allows proper tabbing in editboxes
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://stackoverflow.com/*
// @include http://codereview.stackexchange.com/*
// @include http://programmers.stackexchange.com/*
// @include http://stackapps.stackexchange.com/*
// @version 1.0
// ==/UserScript==


//modified from http://en.wikipedia.org/wiki/User:AoV2/tabs_in_textarea
//replacement insertTags http://stackoverflow.com/a/4384173/1198729

 function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
 };



 with_jquery(function($){

function intercept(e){
if(e.keyCode == 9) { // U+0009 CHARACTER TAB
  insertAtCaret(this,"\t")
  return false;		
}		
else{
  return true;
}
}

 function insertAtCaret(element, text) {
    if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        sel.text = text;
        element.focus();
    } else if (element.selectionStart || element.selectionStart === 0) {
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;
        element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
        element.focus();
        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    } else {
        element.value += text;
        element.focus();
    }
}
$(document.body).on('keydown','textarea[id^=wmd-input]',intercept)


 });
