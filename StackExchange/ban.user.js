// ==UserScript==
// @name Ban myself
// @author Manish Goregaokar (http://stackapps.com/users/10098/manishearth)
// @description Bans you from all stackexchange sites
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @include http://*stackoverflow.com/*
// @include http://superuser.com/*
// @include http://serverfault.com/*
// @include http://*stackexchange.com/*

// ==/UserScript==



 function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
 };


 with_jquery(function($){


   /*** START EDITING HERE                       ***/
   /***                                          ***/
   /***                                          ***/

         // When you want to end your break?
         // no leading zeroes. (example: 7 - correct, 07 - incorrect)

         var date = { year: 2012, month: 12, day: 12};
         var time = { hours: 12, minutes: 12, seconds: 12 };
         var whileLoggedOut=false; //Do you want the script to ban you from using SO while logged out?

   /***                                          ***/
   /***                                          ***/
   /*** STOP EDITING HERE                        ***/




         var currentDate = new Date();
         var enforcedBreakEnd = new Date(date.year,date.month-1,date.day,time.hours,time.minutes,time.seconds);


         if (currentDate <= enforcedBreakEnd) {
                 if(whileLoggedOut){
                      document.body.innerHTML="<h1>GET BACK TO WORK</h1>";

                 }else{
                     $(document).ready(function(){if($("#hlinks-user")[0].childNodes.length > 1){
                      document.body.innerHTML="<h1>GET BACK TO WORK</h1>";     
                     }});
                 }
         }

 });