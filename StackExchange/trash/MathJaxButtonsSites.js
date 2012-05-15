//Smaller script to reduce loading size/time on each SE site (since this must autoupdate when new sites are added)


(function(){
var x=window.location.hostname;

//*************************************
var sites=["[^\\/]*math[^\\/]*","physics","chemistry","biology","electronics","crypto","[^\\/]*quant","[^\\/]*stats"];	  
//*************************************



for(var i=0;i<sites.length;i++){
		var reg=new RegExp("http:\\/\\/"+sites[i]+".stackexchange.com","gi");
		if(x.match(reg)){
			importMainScript();
			break;
		}
}


function importMainScript(){
	 var d=new Date();
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/MathJaxButtonsScript.js"+d.getMonth()+""+d.getDay();
     document.body.appendChild(script);
}
})();