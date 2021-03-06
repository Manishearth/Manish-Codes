
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
//format: [Button HTML text,callback,unique identifier,keyboard shortcut,regex for sitename,regex for NOT sitename, empty string if you don't need this]
window.buttonconfig={
	"2 (SI)":["SI",SIify,"SI","","s",/(physics|chem|biology|electronics)/ig,""],
	"1 (Dollar)":["$",dollarify,"dollar","","m",/stack/ig,/electronics/ig],
	"4 (DoubleDollar)":["$$",Ddollarify,"Ddollar","","",/stack/ig,/electronics/ig],

	//Special per-site ones:
	"3 (Chem)":["O<sub>2</sub>",chemify,"chemify","","c",/chemistry/ig,""],
	"5 (Phy)":["<b>E</b>",clickButtonEventLambda("\\mathbf{","}"),"vectorfield","","v",/physics/ig,""],
	//Electronics.SE needs a backslash
	"1 (DollarElectronics)":["$",clickButtonEventLambda("\\$","\\$"),"dollar","","m",/electronics/ig,""],
	"4 (DDollarElectronics)":["$$",Ddollarify,"Ddollar","","d",/electronics/ig,""], //keyboard shortcut
	//Big O notation
	"5 (BigO)":['<span style=style="font-family: MathJax_Caligraphic; ">O</span>',clickButtonEventLambda("$\\mathcal{O}(",")$"),"dollar","","o",/crypto/ig,""],	
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
			if(window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){
				addButton(buttonconfig[i][0],buttonconfig[i][1],buttonconfig[i][2],buttonconfig[i][3])
			}
	}
}

window.addKeyPressEventLives=function(){

		for(var i in buttonconfig){
			if(buttonconfig[i][4]!=""){
				if(window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){
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
