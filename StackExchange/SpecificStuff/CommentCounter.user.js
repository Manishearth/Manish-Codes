// ==UserScript==
// @name Comment countdown
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Puts a countdown  for comments on /review/
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/review*
// ==/UserScript==



function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


 with_jquery(function($){
$('<div style="position:fixed;top:0;left:0;" id=countdown>0</div>').appendTo('body');
function downCommentTimer(){
$('#countdown').html(parseInt($('#countdown').html(),10)-1)

}

var to=setInterval(downCommentTimer,1000);
function resetCommentTimer(x){
clearInterval(to);
$('#countdown').html(x);
to=setInterval(downCommentTimer,1000);

}
$('form[id^="add-comment"] input[type=submit]').live("click",function(){resetCommentTimer(15);})
 });