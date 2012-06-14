

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){
window.taglines=["I'm completely clueless. Please accept this Calvin & Hobbes strip as a gesture of shame and apology.","This is a great question - I'm completely dumbfounded as to what its solution is. But I do have a Calvin & Hobbes strip!","I have no idea. But here's a Calvin & Hobbes strip to help console you.","I have no idea. However, legend has it that reading Calvin & Hobbes strips will increase your problem solving ability so maybe that can help you.","I'm so glad you asked me that, but I have no clue how to solve it. Have a Calvin & Hobbes strip instead!","That's a fascinating problem, but I really have no idea how to solve it. Have this great Calvin & Hobbes strip instead!","Hmm, you seem to be in the wrong place for this question. Fortunately, I have something which may help you:","Isn't programming fun? I'll tell you what else is fun. Calvin&Hobbes!"];
if($('.question .post-menu a[id^="close-question"]').length>0&&$('.question .post-menu a[id^="close-question"]')[0].innerHTML.indexOf("reopen")==-1){
window.qid=$('.question').attr('data-questionid');
$('<span class="lsep">|</span>').appendTo('.question .post-menu');
$('.question .post-menu a:last').clone().attr("id","close-offtopic").attr("title","Answer with a Calvin and Hobbes strip, along with a closevote.").appendTo('.question .post-menu');
$('.question .post-menu a:last')[0].innerHTML="transmogrify";
$('.question .post-menu a:last').on("click",function(event){
         $('.question .post-menu a[id^="close-question"]')[0].click();


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
$('#question a.vote-down-off:not(.vote-down-on)').click();
StackExchange.MarkdownEditor.refreshAllPreviews();
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