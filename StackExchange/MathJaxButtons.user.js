// ==UserScript==
 // @name MathJax buttons
 // @version 1.0
 // @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
 // @description Adds math buttons to the SEeditor, including a "$" button, a "$$" button, an SI-unit-ify button (on science sites), and a "\ce{}" button on chem.SE
 // @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
 // @include http://*math*.stackexchange.com/*
 // @include http://physics.stackexchange.com/*
 // @include http://chemistry.stackexchange.com/*
 // @include http://biology.stackexchange.com/*
 // ==/UserScript==


//Some functionality copied from https://gist.github.com/2583075. Thanks, Brock.

function ButtonStuff($){
//clickbuttoneventlambda:
window.clickButtonEventLambda=function(left, right){
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
        //-- Have to reset selection, since we repasted the text.
        node.selectionStart = iTargetStart + left.length;
        node.selectionEnd   = iTargetEnd   + left.length;
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
		return false;
    }


}

//Methods:

window.SIify=clickButtonEventLambda("\\:\\mathrm{","}");
window.dollarify=clickButtonEventLambda("$","$");
window.Ddollarify=clickButtonEventLambda("$$","$$");
window.chemify=clickButtonEventLambda("$\\ce{","}$");





//************************************************
//Configuration:
//format: [Button HTML text,callback,unique identifier,keyboard shortcut,regex for sitename]
window.buttonconfig={
	"2 (SI)":["SI",SIify,"SI","","s",/(physics|chem|biology)/ig],
	"1 (Dollar)":["$",dollarify,"dollar","","m",/stack/ig],
	"4 (DoubleDollar)":["$$",Ddollarify,"Ddollar","","",/stack/ig],
	"3 (Chem)":["O<sub>2</sub>",chemify,"chemify","","c",/chemistry/ig],
};

//************************************************






window.addButton=function(text,callback,identify,pic,force){
//Callback must take id of textarea as argument.
force = typeof force !== 'undefined' ? force : false;
var tas=force?$('.wmd-container'):$('.wmd-container').not(".canhasbutton"+identify);
$.each(tas,function(){
try{
if($(this).find("[id^=wmd-button-row]").length==0){
	setTimeout(function(){addButton(text,callback,identify,pic,true)},100);
	return;
}else{
	
	this.className+=" canhasbutton"+identify
}
tid=$(this).find("[id^=wmd-input]")[0].id;
row=$(this).find("[id^=wmd-button-row]")[0];
lastel=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
if(lastel.length>0){
px=parseInt(lastel[0].style.left.replace("px",""))+25;
//add code for background-position of span as well later
btn='<li class="wmd-button" style="left: '+px+'px; "><span style="background-image:url('+pic+');text-align:center;">'+text+'</span></li>';
$(btn).on("click",function(){callback(tid)}).insertAfter(lastel);
btn=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
if(pic==""){
$(btn).children('span').hover(function(){$(this).css('background','#DEEDFF')},function(){$(this).css('background','none')});
}
}

}catch(e){console.log(e)}
})
}








window.keyPressEventLambda=function(key,callback){
return function (zEvent) {
		//console.log(zEvent);
        //--- On Alt-K, insert the <kbd> set. Ignore all other keys.
        if (zEvent.altKey  && ( zEvent.which == key.charCodeAt(0)||zEvent.which == key.toUpperCase().charCodeAt(0))) {
            callback(this.id);
            return false;
        }
        return true;
}
}





window.addButtons=function(){
	for(var i in buttonconfig){
			if(window.location.host.match(buttonconfig[i][5])){
				addButton(buttonconfig[i][0],buttonconfig[i][1],buttonconfig[i][2],buttonconfig[i][3])
			}
	}
}

window.addKeyPressEventLives=function(){

		for(var i in buttonconfig){
			if(buttonconfig[i][4]!=""){
				if(window.location.host.match(buttonconfig[i][5])){
					$("textarea.wmd-input").live("keydown", keyPressEventLambda(buttonconfig[i][4],buttonconfig[i][1]));
				}
			}
		}
}








window.waitUntilExists=function(wb,wfn){
	if(wb.length==0){
   		waitFunc=function(){waitUntilExists(wb,wfn)};
		setTimeout(waitFunc,20);
	}else{
		wfn();
	}
}







$(document).ready(function(){
	addButtons()
	addKeyPressEventLives()
	$("textarea.wmd-input").live("focus",addButtons);
});



};

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};

with_jquery(ButtonStuff);