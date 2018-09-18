// ==UserScript==
// @name Print-a-post
// @version 1.0.2
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds a "print this post" button
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/questions/*
// @include http://*superuser.com/questions/*
// @include http://*serverfault.com/questions/*
// @include http://*stackexchange.com/questions/*
// @include http://discuss.area51.com/questions/*
// @include https://*stackoverflow.com/questions/*
// @include https://*superuser.com/questions/*
// @include https://*serverfault.com/questions/*
// @include https://*stackexchange.com/questions/*
// @include https://discuss.area51.com/questions/*
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){

$('document').ready(function(){
    var htm=$('.post-menu').html()||"";
    if(htm!=-1&&$('[id^=close-question] span').length!=0){
        return;
    }
$('.post-menu').append($('<span class="lsep">|</span><a class="printme" href="#" title="Print this post">print</a>'));
$('.printme').bind("click",function(){
        debugger;
	if(!confirm("Are you sure that you want to waste some paper?\n Any content you've not submitted on this page will be lost.")){
		return false;	
	
	}
	var usernameprint=$(this).closest('div.question,div[id^=answer]').find("div.post-signature div.user-info div.user-details").eq(1).text();
	var printpost=$(this).closest('div.question,div[id^=answer]').find('.post-text').clone().css("margin-left","15px");
	$('body').empty();
	$('body').append(printpost);
	$('body').css('text-align','left')
	$('.post-text').append($('<div>--'+usernameprint+'</div>').css('text-align','right'))
	return false;
});

});
});
