// ==UserScript==
 // @name Post Unfader
 // @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
 // @description Allows one to "unfade" downvoted answers by mouseover/click
 // @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
 // @include http://*stackoverflow.com/questions/*
 // @include http://superuser.com/questions/*
 // @include http://serverfault.com/questions/*
 // @include http://*stackexchange.com/questions/*

 // ==/UserScript==



function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


 with_jquery(function($){
$('.downvoted-answer').on("click",function(){$(this).find('.post-text, .post-signature, .votecell, .comments').css('color','#000');this.clicked=true;});
$('.downvoted-answer').on("mouseover",function(){$(this).find('.post-text, .post-signature, .votecell, .comments').css('color','#000')});
$('.downvoted-answer').on("mouseout",function(){if(!this.clicked){$(this).find('.post-text, .post-signature, .votecell, .comments').css('color','#888')}});
 });