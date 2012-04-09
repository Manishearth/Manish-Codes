// ==UserScript==
 // @name Print-a-post
 // @version 1.0
 // @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
 // @description Adds a "print this post" button
 // @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
 // @include http://*stackoverflow.com/questions/*
 // @include http://*superuser.com/questions/*
 // @include http://*serverfault.com/questions/*
 // @include http://*stackexchange.com/questions/*
 // @include http://discuss.area51.com/questions/*
 // ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){
$('.post-menu').append($('<span class="lsep">|</span><a class="printme" href="#" title="Print this post">print</a>'));
$('.printme').bind("click",function(){
	printpost=$(this).closest('div.question,div[id^=answer]').find('.post-text').clone();
	$('body').empty();
	$('body').append(printpost);
	$('body').css('text-align','left')
	
	return false;
});

});
});