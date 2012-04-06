// ==UserScript==
 // @name Accounts tab
 // @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
 // @description Brings back the accounts tab(sort of)
 // @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
 // @include http://*stackoverflow.com/users/*
 // @include http://superuser.com/users/*
 // @include http://serverfault.com/users/*
 // @include http://*stackexchange.com/users/*

 // ==/UserScript==



 function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
 };


 with_jquery(function($){
if($('.user-panel-footer a[alt="full list of accounts"]').length!=0){
$("<a href='"+$('.user-panel-footer a[alt="full list of accounts"]')[0].href+"'>Accounts</??a>").insertAfter($("#tabs a:last"))
}
 });