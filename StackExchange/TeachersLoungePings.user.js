// ==UserScript==
// @name Summon the Gods
// @version 1.0.2
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Lets mods bug the overlords from TL
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://chat.stackexchange.com/rooms/4/teachers-lounge
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};


with_jquery(function($){
$('document').ready(function(){

$('#input').keyup(function(){this.value=this.value.replace(/community mods\:/ig,"@RebeccaChernoff, @Shog9, @AnnaLear, @Aarthi, @GraceNote, @RobertCartaino:").replace(/dev(eloper)?s\:/ig,"@MarcGravell, @balpha, @waffles:")})

});
});