// ==UserScript==
// @name Election comment links
// @version 1.0.0
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Adds comment link functionality for elections
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.askdifferent.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// @exclude       http://*/reputation

// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){

$('.comment-date').not(':has(a)').each(function(){
										
$(this).html('<a>'+this.innerHTML+'</a>');

$(this).find('a').attr('href',(window.location.toString().split("#")[0])+"#"+$(this).parents('tr[id^=comment]').attr('id'))
});

$('a.question-hyperlink:empty').each(function(){
													
var hash=this.href.split("#")[1].replace('comment','').split("_")											  
var $self=$(this);
$self.html('Nomination');
$.get(this.href,function(data){
					
	$data=$(data);
	$self.html($data.find('#post-'+hash[1]).find('.post-signature.owner').find('.user-details a:first').html()+"'s nomination").attr('href',$data.find('#tabs a:first').attr('href')+"#comment-"+hash[0])
});										  
											  
});

});
});