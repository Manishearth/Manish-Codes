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
 var SENetworkProfile= $('img[alt="stack exchange network profile"]')
if(SENetworkProfile.length!=0){
$("<a href='"+SENetworkProfile.parent().attr('href')+'?tab=accounts'+"'>accounts</??a>").insertAfter($("#tabs a:last"))
}
 });