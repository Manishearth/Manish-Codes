//


(function(){
//<div class="wmd-prompt-background" style="position: absolute; top: 0px; z-index: 1000; opacity: 0.5; height: 836px; left: 0px; width: 100%; "></div>
//http://stackoverflow.com/questions/6250704/view-image-selected-from-file-system-on-client-side-before-upload
/*

<div style="top: 234.5px; left: 474.5px; display: block; padding: 10px; position: absolute; width: 400px; z-index: 1001; " class="wmd-prompt-dialog">

<div style="position: absolute; right: 20px; bottom: 5px; font-size: 10px;">image hosting by <a title="imgur: the simple image sharer" href="http://imgur.com">imgur.com</a></div>


<p><b>Insert an image</b></p>

<p style="padding-top: 10px;"><a href="#" class="wmd-mini-button selected" id="upload-image-button">from my computer</a>
<a href="#" class="wmd-mini-button" id="upload-url-button">from the web</a></p>


<form action="/upload/image" method="post" enctype="multipart/form-data"><input type="hidden" name="fkey" value="f98fbceda0a86f81d98ddad95771349e"><div style="position: relative;height: 40px;" id="upload-file-input"><img src="http://i.imgur.com/GKc7H.png" height="15px" width="15px" style="vertical-align:middle;margin-right:6px;">

<input type="file" name="filename" id="filename-input" value="browse" style="border:0; vertical-align:middle;"></div><p id="upload-message" style="padding-top: 4px; margin:0; line-height: 16px;">click browse to choose an image from your computer</p><div class="ac_loading" id="image-upload-progress" style="background-color: transparent; display:none;">Uploading ...</div><input type="submit" value="Upload" style="width: 7em; margin: 10px;"><input type="button" value="Cancel" id="close-dialog-button" style="width: 7em; margin: 10px 10px 20px;"></form>

</div>


*/
window.ThumbnailUpload={};
with(ThumbnailUpload){
ThumbnailUpload.modalParams=[350,200];//[width,height]

ThumbnailUpload.showModal=function(tid){
	$('<div id="thumbnail-upload-shadow" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;opacity:0.5;background-color:black"></div>').appendTo('body');
	$('<div id="thumbnail-upload-dialog" class="wmd-prompt-dialog" style="z-index:1001;position:absolute;left:'+(window.innerWidth-modalParams[0])/2+'px;top:'+(window.innerHeight-modalParams[1])/2+'px;width:'+modalParams[0]+'px;height:'+modalParams[1]+'px;"><iframe id="thumbnail-upload-iframe" style="width:100%;height:100%"></iframe></div>').appendTo('body');
	ThumbnailUpload.iframeWin=$('#thumbnail-upload-iframe')[0].contentWindow;


	 var script = iframeWin.document.createElement("script");
     script.type = "text/javascript";
     script.src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
     iframeWin.document.head.appendChild(script);

	function loadScr(){
	 if(iframeWin.$){
		 var script = iframeWin.document.createElement("script");
		 script.type = "text/javascript";
		 script.textContent="("+ThumbnailUpload.childScripts.toString()+")('"+StackExchange.options.user.fkey+"')";
		 iframeWin.document.body.appendChild(script);
	 }else{
		setTimeout(loadScr,10); 
	 }
	}
	loadScr();
}
ThumbnailUpload.closeModal=function(){
	$('#thumbnail-upload-shadow, #thumbnail-upload-dialog').remove();
}
ThumbnailUpload.childScripts=function(fkey){
var styles = document.createElement("link");
styles.type = "text/css";
styles.rel="stylesheet";
styles.href=window.parent.$('link[rel=stylesheet]').filter(function(){if(!this.href){return false;}return this.href.match(/all\.css/)})[0].href;
document.head.appendChild(styles);
var ts=new Date().getTime()
	
	
$('body').css('background-color',"#DDD").append('<p><b>Insert an image</b></p><p style="padding-top: 10px;"><a href="javascript:void(0)" class="wmd-mini-button selected" id="upload-image-button">from my computer</a><a href="javascript:void(0)" class="wmd-mini-button" id="upload-url-button">from the web</a></p>')
.append('<form action="/upload/image" id="frompcupload" method="post" enctype="multipart/form-data"><input type="hidden" name="fkey" value="'+fkey+'"><div style="position: relative;height: 40px;" id="upload-file-input"><img src="http://i.imgur.com/GKc7H.png" height="15px" width="15px" style="vertical-align:middle;margin-right:6px;"><input type="file" name="filename" id="filename-input" value="browse" style="border:0; vertical-align:middle;"></div><p id="upload-message" style="padding-top: 4px; margin:0; line-height: 16px;">click browse to choose an image from your computer</p><div class="ac_loading" id="image-upload-progress" class="image-upload-progress" style="background-color: transparent; display:none;">Uploading ...</div><input type="submit" value="Upload" style="width: 7em; margin: 10px;"><input type="button" value="Cancel" id="close-dialog-button" class="close-dialog-button" style="width: 7em; margin: 10px 10px 20px;"></form>')
.append('<form action="/upload/image" id="fromwebupload" style="display:none" method="post" enctype="multipart/form-data"><div id="upload-url-input" style="height: 40px; "><input type="input" name="upload-url" value="" style="width: 250px;"></div><input type="hidden" name="fkey" value="'+fkey+'"><p id="upload-message" style="padding-top: 4px; margin:0; line-height: 16px;">paste the URL of your image above</p><div class="ac_loading" id="image-upload-progress" class="image-upload-progress" style="background-color: transparent; display:none;">Uploading ...</div><input type="submit" value="Upload" style="width: 7em; margin: 10px;"><input type="button" value="Cancel" id="close-dialog-button" class="close-dialog-button" style="width: 7em; margin: 10px 10px 20px;"></form>').append('<iframe id="upload-iframe-'+ts+'" style="display:none;" src="about:blank" name="upload-iframe-'+ts+'"></iframe>');

$('form').attr('target',"upload-iframe-"+ts);
$("#upload-image-button").click(function(){$('#fromwebupload').hide();$('#frompcupload').show();$("#upload-image-button").addClass('selected');$("#upload-url-button").removeClass('selected');return false;})
$("#upload-url-button").click(function(){$('#frompcupload').hide();$('#fromwebupload').show();$("#upload-image-button").removeClass('selected');$("#upload-url-button").addClass('selected');return false;})



$('.close-dialog-button').click(function(){window.parent.ThumbnailUpload.closeModal();return false;});
$('form').submit(function(){$('.ac_loading').show();return true;});
	//closeDialog(result)
    //displayUploadError(error)
	
	
window.closeDialog=function(result){
	console.log(["cD",result]);
	
}
window.displayUploadError=function(error){
	console.log(["dUE",error]);
	
}


}


	
	
}


})();