//(function(){
var x=window.location.origin;

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
     script.src="https://raw.github.com/Manishearth/Manish-Codes/master/StackExchange/MathJaxButtonsScript.js?rand="+Math.random();
     document.body.appendChild(script);
}
//})();