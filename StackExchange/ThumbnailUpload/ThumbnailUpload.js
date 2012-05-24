//


(function(){

window.ThumbnailUpload={};
with(ThumbnailUpload){
ThumbnailUpload.modalParams=[400,300];//[width,height]

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
$('<table style="text-align:center;font-size:10px;margin:0 auto;border-spacing:10px;border-collapse:inherit"><tr id="thumbupload-options"><td class="thumbupload-optionbx" id="thumbupload-optionbx-bypass"><input type=radio name="thumbupload-options-bx" id="thumbupload-option-bypass" selected><label for="thumbupload-option-bypass"> Normal image</label></td><td class="thumbupload-optionbx" id="thumbupload-optionbx-sizes"><table><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-large"><label for="thumbupload-option-large"> Large</label></td></tr><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-medium"><label for="thumbupload-option-medium"> Medium</label></td></tr><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-small"><label for="thumbupload-option-small"> Small</label></td></tr></table></td><td id="thumbupload-optionbx-custom" class="thumbupload-optionbx"><table><tr><td><input type=text size=3 name="thumbupload-options-height" id="thumbupload-option-height"><label for="thumbupload-option-height"> Height(px)</label></td></tr><tr><td><input type=text size=3 name="thumbupload-options-width" id="thumbupload-option-width"><label for="thumbupload-option-width"> Width(px)</label></td></tr></table></td></tr></table>').appendTo('body')

$('td.thumbupload-optionbx').css({
"padding":"10px",
"-webkit-border-radius":"7px",
"-moz-border-radius":"7px"}).hover(function(){$(this).css("background-color","#AAA")},function(){if($(this).hasClass('selected')){$(this).css("background-color","#CCC")}else{$(this).css("background-color","#DDD")}}).click(function(){$('td.thumbupload-optionbx.selected').css("background-color","#DDD").removeClass('selected');$(this).css("background-color","#AAA").addClass('selected');})
$('#thumbupload-optionbx-bypass').click(function(){$('#thumbupload-option-bypass').attr('checked',true);$("#thumbupload-option-height,#thumbupload-option-width").blur()}).click();
$('#thumbupload-optionbx-sizes').click(function(){if(!$('#thumbupload-option-large').attr('checked')&&!$('#thumbupload-option-small').attr('checked'))$('#thumbupload-option-medium').attr('checked',true);$("#thumbupload-option-height,#thumbupload-option-width").blur()});
$('#thumbupload-optionbx-custom').click(function(){$('input[type=radio]').attr('checked',false);$("#thumbupload-option-height").focus()});



window.closeDialog=function(result){
	$('.ac_loading').hide()
	console.log(["cD",result]);
	
}
window.displayUploadError=function(error){
	$('.ac_loading').hide()
	console.log(["dUE",error]);
	
}





}


	
	
}


})();

