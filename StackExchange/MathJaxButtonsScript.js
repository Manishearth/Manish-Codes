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

//Special function for entering and exiting math mode (places cursor after next dollar sign)
function enterExitMathMode(tid){
var node=$('#'+tid)[0];
try{
var text   = node.value || node.textContent;
var iEnd      = node.selectionEnd;
var re=/\$/ig;
while (m = re.exec(text)) {
   if(m.index>iEnd){
    var SE=m.index;
if(text.charAt(SE+1=="$")){
SE++
}
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


//Methods:

window.SIify=clickButtonEventLambda("\\:\\mathrm{","}");
window.dollarify=clickButtonEventLambda("$","$");
window.Ddollarify=clickButtonEventLambda("$$","$$");
window.chemify=clickButtonEventLambda("$\\ce{","}$");





//************************************************
//Configuration:
//format: [Button HTML text,callback,unique identifier,empty,keyboard shortcut,regex for sitename,regex for NOT sitename(empty string if you don't need this),tooltip]
window.buttonconfig={
	"2 (SI)":["SI",SIify,"SI","","s",/(physics|chem|biology|electronics)/ig,"","Format selection as an SI unit"],
	"1 (Dollar)":["$",dollarify,"dollar","","m",/stack/ig,/electronics/ig,"Enclose in MathJax dollar symbols"],
	"4 (DoubleDollar)":["$$",Ddollarify,"Ddollar","","",/stack/ig,/electronics/ig,"Enclose in MathJax double-dollar symbols"],

	//Special per-site ones:
	"3 (Chem)":["O<sub>2</sub>",chemify,"chemify","","c",/chemistry/ig,"","Enclose selection in $\ce{...}$"],
	"5 (Phy)":["<b>E</b>",clickButtonEventLambda("\\mathbf{","}"),"vectorfield","","v",/physics/ig,"","Format selection as vector field"],
	//Electronics.SE needs a backslash
	"1 (DollarElectronics)":["$",clickButtonEventLambda("\\$","\\$"),"dollar","","m",/electronics/ig,"","Enclose in MathJax dollar symbols"],
	"4 (DDollarElectronics)":["$$",Ddollarify,"Ddollar","","d",/electronics/ig,"","Enclose in MathJax double-dollar symbols"], //keyboard shortcut
	//Big O notation
	"5 (BigO)":['NONE',clickButtonEventLambda("$\\mathcal{O}(",")$"),"BigO","","o",/(crypto|cs\.stack|cstheory)/ig,"","Enclose selection in big O notation"],
	"6 (SansSerif)":['NP',clickButtonEventLambda("$\\mathsf{","}$"),"serify","","s",/(cstheory|cs\.stack)/ig,"","Enclose selection in $\\mathsf{..}$"],
	
	
	
	//Just keyboard shortcuts
	
	"100 (EEMathMode)":['NONE',enterExitMathMode,"eemm","","z",/(stack)/ig,"",""], //Enter and exit math mode
};

//************************************************






window.addButton=function(text,callback,identify,pic,tooltip,force){
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








window.keyPressEventLambda=function(key,callback){
return function (zEvent) {
		//console.log(zEvent);
        //--- On Alt-K, insert the <kbd> set. Ignore all other keys.
        if (zEvent.altKey  && ( zEvent.which == key.charCodeAt(0)||zEvent.which == key.toUpperCase().charCodeAt(0))) {
            callback(this.id);
            zEvent.preventDefault()
            return false;
        }
        return true;
}
}





window.addButtons=function(){
	for(var i in buttonconfig){
			if(buttonconfig[i][0]!="NONE"&&window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){
				
				addButton(buttonconfig[i][0],buttonconfig[i][1],buttonconfig[i][2],buttonconfig[i][3],(buttonconfig[i][7]+((buttonconfig[i][4])?" (Alt-"+buttonconfig[i][4].toUpperCase()+")":"")),false);
			}
	}
}

window.addKeyPressEventLives=function(){

		for(var i in buttonconfig){
			if(buttonconfig[i][4]!=""){

				if(window.location.host.match(buttonconfig[i][5])&&(buttonconfig[i][6]==""||!window.location.host.match(buttonconfig[i][6]))){
					if(buttonconfig[i].keyAdded){
						continue;
					}
					$("textarea.wmd-input").live("keydown", keyPressEventLambda(buttonconfig[i][4],buttonconfig[i][1]));
					buttonconfig[i].keyAdded=true;
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
