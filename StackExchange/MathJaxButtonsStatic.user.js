// ==UserScript==
// @name MathJax buttons
// @version 2.2.2
// @grant none
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds math buttons to the SEeditor, including a "$" button, a "$$" button, an SI-unit-ify button (on science sites), and a "\ce{}" button on chem.SE
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://physics.stackexchange.com/*
// @include http://math.stackexchange.com/*
// @include http://meta.math.stackexchange.com/*
// @include http://chemistry.stackexchange.com/*
// @include http://biology.stackexchange.com/*
// @include http://crypto.stackexchange.com/*
// @include http://electronics.stackexchange.com/*
// @include http://quant.stackexchange.com/*
// @include http://meta.quant.stackexchange.com/*
// @include http://stats.stackexchange.com/*
// @include http://meta.stats.stackexchange.com/*
// @include http://cstheory.stackexchange.com/*
// @include http://meta.cstheory.stackexchange.com/*
// @include http://meta.chemistry.stackexchange.com/*
// @include http://cs.stackexchange.com/*
// @include http://scicomp.stackexchange.com/*
// @include http://dsp.stackexchange.com/*
// @include http://cogsci.stackexchange.com/*
// @include http://mathoverflow.net/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


//Some functionality copied from https://gist.github.com/2583075. Thanks, Brock.

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};

//*************************************
var x="http://"+window.location.hostname;
var sites=["[^\\/]*math[^\\/]*","physics","[^\\/]*chemistry","biology","electronics","crypto","[^\\/]*quant","[^\\/]*stats","dsp","cogsci","cs","[^\\/]*cstheory","scicomp","mathoverflow"];	  
//*************************************



for(var i=0;i<sites.length;i++){
		var reg=new RegExp("http:\\/\\/"+sites[i]+".stackexchange.com","gi");
		if(x.match(reg)){
			importMainScript();
			break;
		}
}
function importMainScript($){
window.MathJaxButtons={};
with(MathJaxButtons){
//clickbuttoneventlambda:
MathJaxButtons.clickButtonEventLambda=function(left, right){
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
MathJaxButtons.inlineMath=["$","$"];
MathJaxButtons.blockMath=["$$","$$"];
MathJaxButtons.mathRegExClose=/(\$)/ig;
if(window.location.hostname.match(/electronics/ig)){
MathJaxButtons.inlineMath=["\\$","\\$"];	
MathJaxButtons.mathRegExClose=/(\\\$)/ig	

}

//Special function for entering and exiting inline math mode (places cursor after next dollar sign)
function enterExitMathMode(tid){
var node=$('#'+tid)[0];
try{
var text   = node.value || node.textContent;
var iEnd      = node.selectionEnd;
var re=MathJaxButtons.mathRegExClose;
while (m = re.exec(text)) {
   if(m.index>=iEnd){
    var SE=m.index;
    SE+=m[0].length;
node.selectionStart=SE;
node.selectionEnd=SE;
break;
   }
} 

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



//************************************************
//Configuration:
//format: [Button HTML text,callback,unique identifier,empty,keyboard shortcut,regex for sitename,regex for NOT sitename(empty string if you don't need this),tooltip]
MathJaxButtons.buttonconfig={
	"2 (SI)":["SI",clickButtonEventLambda("\\:\\mathrm{","}"),"SI","","s",/(physics|chem|biology|electronics)/ig,"","Format selection as an SI unit"],
	"1 (Dollar)":[inlineMath[0],clickButtonEventLambda(inlineMath[0],inlineMath[1]),"dollar","","m",/stack/ig,/electronics/ig,"Enclose in MathJax dollar symbols"],
	"4 (DoubleDollar)":[blockMath[0],clickButtonEventLambda(blockMath[0],blockMath[1]),"Ddollar","","d",/stack/ig,/electronics/ig,"Enclose in MathJax double-dollar symbols"],

	//Special per-site ones:
	"3 (Chem)":["O<sub>2</sub>",clickButtonEventLambda("$\\ce{","}$"),"chemify","","c",/chemistry/ig,"","Enclose selection in "+inlineMath[0]+"\ce{...}"+inlineMath[1]],
	"5 (Phy)":["<b>E</b>",clickButtonEventLambda("\\mathbf{","}"),"vectorfield","","v",/physics/ig,"","Format selection as vector field"],
	//Electronics.SE needs a backslash
	"1 (DollarElectronics)":[inlineMath[0],clickButtonEventLambda("\\$","\\$"),"dollar","","m",/electronics/ig,"","Enclose in MathJax dollar symbols"],
	"4 (DDollarElectronics)":[blockMath[0],clickButtonEventLambda("$$","$$"),"Ddollar","","d",/electronics/ig,"","Enclose in MathJax double-dollar symbols"], //keyboard shortcut
	//Big O notation
	"5 (BigO)":['NONE',clickButtonEventLambda(inlineMath[0]+"\\mathcal{O}(",")"+inlineMath[1]),"BigO","","o",/(crypto|\/cs\.stack|cstheory)/ig,/electronics.stack/ig,"Enclose selection in big O notation"],
	"6 (SansSerif)":['NP',clickButtonEventLambda(inlineMath[0]+"\\mathsf{","}"+inlineMath[1]),"serify","","s",/(cstheory|\/cs\.stack)/ig,/electronics.stack/ig,"Enclose selection in "+inlineMath[0]+"\\mathsf{..}"+inlineMath[1]],
	"7 (Phy)":["〈 |",clickButtonEventLambda("\\langle "," |"),"bra","","b",/physics/ig,"","Enclose selection in bra"],
	"8 (Phy)":["| 〉",clickButtonEventLambda("| "," \\rangle"),"ket","","k",/physics/ig,"","Enclose selection in ket"],


	//Just keyboard shortcuts

	"100 (EEMathMode)":['NONE',enterExitMathMode,"eemm","","z",/(stack)/ig,"",""], //Enter and exit math mode
};

//************************************************






MathJaxButtons.addButton=function(text,callback,identify,pic,tooltip,force){
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

$(btn).on("click",function(){callback(tid)}).attr("title",tooltip).insertAfter(lastel);

btn=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
if(pic==""){
$(btn).children('span').hover(function(){$(this).css('background','#DEEDFF')},function(){$(this).css('background','none')});
}
}

}catch(e){console.log(e)}
})
}








MathJaxButtons.keyPressEventLambda=function(key,callback){
return function (zEvent) {
        if (zEvent.altKey  && ( zEvent.which == key.charCodeAt(0)||zEvent.which == key.toUpperCase().charCodeAt(0))) {
            zEvent.stopPropagation();
            zEvent.preventDefault()
            callback(this.id);
            
            return false;
        }
        return true;
}
}

MathJaxButtons.keyStopEventLambda=function(key){
return function (zEvent) {

        if (zEvent.altKey  && ( zEvent.which == key.charCodeAt(0)||zEvent.which == key.toUpperCase().charCodeAt(0))) {
            zEvent.stopPropagation();
            zEvent.preventDefault()
            
            return false;
        }
        return true;
}
}




MathJaxButtons.addButtons=function(){
	for(var i in buttonconfig){
			if(buttonconfig[i][0]!="NONE"&&window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){

				addButton(buttonconfig[i][0],buttonconfig[i][1],buttonconfig[i][2],buttonconfig[i][3],(buttonconfig[i][7]+((buttonconfig[i][4])?" (Alt-"+buttonconfig[i][4].toUpperCase()+")":"")),false);
			}
	}
}

MathJaxButtons.addKeyPressEventLives=function(){

		for(var i in buttonconfig){
			if(buttonconfig[i][4]!=""){

				if(window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){
					if(buttonconfig[i].keyAdded){
						continue;
					}
					if(!$("textarea.wmd-input").data('KeyEvents'+buttonconfig[i][4])){
					$("textarea.wmd-input").live("keydown", keyPressEventLambda(buttonconfig[i][4],buttonconfig[i][1]));
					$("textarea.wmd-input").live("keyup keypress", keyStopEventLambda(buttonconfig[i][4]));//Prevent bubbling here to browser
					$("textarea.wmd-input").data('KeyEvents'+buttonconfig[i][4],"1")
					}
					buttonconfig[i].keyAdded=true;
				}
			}
		}
}








MathJaxButtons.waitUntilExists=function(wb,wfn){
	if(wb.length==0){
   		waitFunc=function(){waitUntilExists(wb,wfn)};
		setTimeout(waitFunc,20);
	}else{
		wfn();
	}
}


}




$(document).ready(function(){
	MathJaxButtons.addButtons()
	MathJaxButtons.addKeyPressEventLives()
	$("textarea.wmd-input").live("focus",MathJaxButtons.addButtons);
});
}




with_jquery(importMainScript);
