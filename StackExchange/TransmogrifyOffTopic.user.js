// ==UserScript==
// @name Transmogrify Offtopic button
// @version 1.0
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds a self-navigating "Close-offtopic" button to MSO which autocomments
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://meta.stackoverflow.com/questions/*

// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){
window.taglines=["That's a fascinating problem, but I really have no idea how to solve it. Have this great Calvin & Hobbes strip instead!"];
if($('.question .post-menu a[id^="close-question"]').length>0&&$('.question .post-menu a[id^="close-question"]')[0].innerHTML.indexOf("reopen")==-1){
window.qid=$('.question').attr('data-questionid');
$('<span class="lsep">|</span>').appendTo('.question .post-menu');
$('.question .post-menu a:last').clone().attr("id","close-offtopic").attr("title","Comment ans vote-to-close as off topic").appendTo('.question .post-menu');
$('.question .post-menu a:last')[0].innerHTML="transmogrify";
$('.question .post-menu a:last').on("click",function(event){
         $('.question .post-menu a[id^="close-question"]')[0].click();


window.getImg=function(callback){
	function pad(number){
		if(number<10){
			return "0"+""+number;	
		}
			return number+"";
	}
	var start=new Date('August 25, 2003').getTime();
	var daydiff=(new Date().getTime()-start)/(1000*60*60*24)
	var date=new Date()
	date.setTime(start+((1000*60*60*24)*parseInt(daydiff*Math.random())));
	var dateStr=date.getFullYear()+"." + pad(date.getMonth() + 1) +"."+pad(date.getDate());
	var url="http://comics.dp.cx/"+dateStr+"/Calvin%20and%20Hobbes-"+dateStr+".gif";
	$("<img src='"+url+"' onerror='(function(){if($(this).attr(\"data-ping\")){}else{$(this).remove();getImg("+callback+");}})();' onload='(function(){if($(this).attr(\"data-ping\")){}else{$(this).attr(\"data-ping\",true);"+callback+"()}})();'>");
}
	function pad(number){
		if(number<10){
			return "0"+""+number;	
		}
			return number+"";
	}
	var start=new Date('August 25, 2003').getTime();
	var daydiff=(new Date().getTime()-start)/(1000*60*60*24)
	var date=new Date()
	date.setTime(start+((1000*60*60*24)*parseInt(daydiff*Math.random())));
	var dateStr=date.getFullYear()+"." + pad(date.getMonth() + 1) +"."+pad(date.getDate());
	var url="http://comics.dp.cx/"+dateStr+"/Calvin%20and%20Hobbes-"+dateStr+".gif";
	
$('#wmd-input')[0].value=taglines[Math.floor(taglines.length*Math.random())]+"\n\n![enter image description here][1]\n\n  [1]: "+url;
$('#communitymode').click();
});
}
});

window.waitUntilExists=function(wbid,wfn){
	if($("#"+wbid).length==0){
   		window.waitFunc=function(){waitUntilExists(wbid,wfn)};
		setTimeout(waitFunc,20);
	}else{
		wfn();
	}
}

});