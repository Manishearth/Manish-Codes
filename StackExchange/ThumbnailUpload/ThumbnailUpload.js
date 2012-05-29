//


(function(){

window.ThumbnailUpload={};
with(ThumbnailUpload){
ThumbnailUpload.modalParams=[400,325];//[width,height]

ThumbnailUpload.showModal=function(tid){
	$('<div id="thumbnail-upload-shadow" style="position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;opacity:0.5;background-color:black"></div>').appendTo('body');
	$('<div id="thumbnail-upload-dialog" class="wmd-prompt-dialog" style="z-index:1001;position:fixed;left:'+(window.innerWidth-modalParams[0])/2+'px;top:'+(window.innerHeight-modalParams[1])/2+'px;width:'+modalParams[0]+'px;height:'+modalParams[1]+'px;"><iframe id="thumbnail-upload-iframe" style="width:100%;height:100%"></iframe></div>').appendTo('body');
	ThumbnailUpload.iframeWin=$('#thumbnail-upload-iframe')[0].contentWindow;
	ThumbnailUpload.tid=tid;

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
	StackExchange.MarkdownEditor.refreshAllPreviews();
}
ThumbnailUpload.childScripts=function(fkey){
var styles = document.createElement("link");
styles.type = "text/css";
styles.rel="stylesheet";
styles.href=window.parent.$('link[rel=stylesheet]').filter(function(){if(!this.href){return false;}return this.href.match(/all\.css/)})[0].href;
document.head.appendChild(styles);
var ts=new Date().getTime()
	
	
$('body').css({'background-color':"#DDD","overflow":"hidden"}).append('<p><b>Insert an image</b></p><p style="padding-top: 10px;"><a href="javascript:void(0)" class="wmd-mini-button selected" id="upload-image-button">from my computer</a><a href="javascript:void(0)" class="wmd-mini-button" id="upload-url-button">from the web</a></p>')
.append('<form action="/upload/image" id="frompcupload" method="post" enctype="multipart/form-data"><input type="hidden" name="fkey" value="'+fkey+'"><div style="position: relative;height: 40px;" id="upload-file-input"><img src="http://i.imgur.com/GKc7H.png" height="15px" width="15px" style="vertical-align:middle;margin-right:6px;"><input type="file" name="filename" id="filename-input" value="browse" style="border:0; vertical-align:middle;"></div><p id="upload-message" class="upload-message" style="padding-top: 4px; margin:0; line-height: 16px;">click browse to choose an image from your computer</p><div class="ac_loading" id="image-upload-progress" class="image-upload-progress" style="background-color: transparent; display:none;">Uploading ...</div><input type="submit" value="Upload" style="width: 7em; margin: 10px;"><input type="button" value="Cancel" id="close-dialog-button" class="close-dialog-button" style="width: 7em; margin: 10px 10px 20px;"></form>')
.append('<form action="/upload/image" id="fromwebupload" style="display:none" method="post" enctype="multipart/form-data"><div id="upload-url-input" style="height: 40px; "><input type="input" name="upload-url" value="" style="width: 250px;"></div><input type="hidden" name="fkey" value="'+fkey+'"><p id="upload-message" class="upload-message" style="padding-top: 4px; margin:0; line-height: 16px;">paste the URL of your image above</p><div class="ac_loading" id="image-upload-progress" class="image-upload-progress" style="background-color: transparent; display:none;">Uploading ...</div><input type="submit" value="Upload" style="width: 7em; margin: 10px;"><input type="button" value="Cancel" id="close-dialog-button" class="close-dialog-button" style="width: 7em; margin: 10px 10px 20px;"></form>').append('<iframe id="upload-iframe-'+ts+'" style="display:none;" src="about:blank" name="upload-iframe-'+ts+'"></iframe>');

$('form').attr('target',"upload-iframe-"+ts);
$("#upload-image-button").click(function(){$('#fromwebupload').hide();$('#frompcupload').show();$("#upload-image-button").addClass('selected');$("#upload-url-button").removeClass('selected');return false;})
$("#upload-url-button").click(function(){$('#frompcupload').hide();$('#fromwebupload').show();$("#upload-image-button").removeClass('selected');$("#upload-url-button").addClass('selected');return false;})



$('.close-dialog-button').click(function(){window.parent.ThumbnailUpload.closeModal();return false;});
$('form').submit(function(){$('.upload-message').hide();$('.ac_loading').show();return true;});
	//closeDialog(result)
    //displayUploadError(error)
$('<table style="text-align:center;font-size:10px;margin:0 auto;border-spacing:10px;border-collapse:inherit"><tr id="thumbupload-options"><td class="thumbupload-optionbx" id="thumbupload-optionbx-bypass"><input type=radio name="thumbupload-options-bx" id="thumbupload-option-bypass" selected><label for="thumbupload-option-bypass"> Normal image</label></td><td class="thumbupload-optionbx" id="thumbupload-optionbx-sizes"><table><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-large"><label for="thumbupload-option-large"> Large</label></td></tr><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-medium"><label for="thumbupload-option-medium"> Medium</label></td></tr><tr><td><input type=radio name="thumbupload-options-bx" id="thumbupload-option-small"><label for="thumbupload-option-small"> Small</label></td></tr></table></td><td id="thumbupload-optionbx-custom" class="thumbupload-optionbx"><table><tr><td><input type=text size=3 name="thumbupload-options-height" id="thumbupload-option-height"><label for="thumbupload-option-height"> Height(px)</label></td></tr><tr><td><input type=text size=3 name="thumbupload-options-width" id="thumbupload-option-width"><label for="thumbupload-option-width"> Width(px)</label></td></tr></table></td></tr><tr width="100%"><td width="100%" colspan="3"><span style="text-align:center;display:block;"><input type=checkbox  name="thumbupload-options-linkify" id="thumbupload-option-linkify"><label for="thumbupload-option-linkify"> Link to full size </label></span></td></tr></table>').appendTo('body')

$('td.thumbupload-optionbx').css({
"padding":"10px",
"-webkit-border-radius":"7px",
"-moz-border-radius":"7px"}).hover(function(){$(this).css("background-color","#AAA")},function(){if($(this).hasClass('selected')){$(this).css("background-color","#CCC")}else{$(this).css("background-color","#DDD")}}).click(function(){
	
		$('td.thumbupload-optionbx.selected').css("background-color","#DDD").removeClass('selected');
		$(this).css("background-color","#AAA").addClass('selected');
	})
$('#thumbupload-optionbx-bypass').click(function(){
													 $('[name="thumbupload-options-bx"]').attr('checked',false);
													 $('#thumbupload-option-bypass').attr('checked',true);$
													 ("#thumbupload-option-height,#thumbupload-option-width").blur()
												 }).click();
$('#thumbupload-optionbx-sizes').click(function(){
										if(!($('#thumbupload-option-small').attr('checked')||$('#thumbupload-option-large').attr('checked'))){
													$('[name="thumbupload-options-bx"]').attr('checked',false);
													$('#thumbupload-option-medium').attr('checked',true);
													$("#thumbupload-option-height,#thumbupload-option-width").blur()
										}
												
											});
$('#thumbupload-option-small,#thumbupload-option-large').click(function(){
	 $('[name="thumbupload-options-bx"]').attr('checked',false);													
	$(this).attr('checked',true);																	

});


$('[for=thumbupload-option-small],[for=thumbupload-option-large]').click(function(){
	 $('[name="thumbupload-options-bx"]').attr('checked',false);															
	$('#'+$(this).attr('for')).attr('checked','true');																			  
	return false;
});
$('#thumbupload-optionbx-custom').click(function(){
												 $('[name="thumbupload-options-bx"]').attr('checked',false);
												 $('input[type=radio]').attr('checked',false);
												 if(!$("#thumbupload-option-width")[0].focused){
												 $("#thumbupload-option-height").focus()
												 }
											});

$('#thumbupload-option-width').click( function(){$("#thumbupload-option-width").focus();})
$('#thumbupload-option-width').focus(function(){this.focused=true;})
$('#thumbupload-option-width').blur(function(){this.focused=false;})
window.closeDialog=function(result){
	$('.ac_loading').hide();
	node=window.parent.$('#'+window.parent.ThumbnailUpload.tid)[0];
    var iS    = node.selectionStart;
    var iE      = node.selectionEnd;
	var val=node.value;
	var tBeg=val.substr(0,iS);
	var title=val.substr(iS,iE-iS);
	var tEnd=val.substr(iE,node.value.length-iE);
	var reg=/\s\s\[(\d)\]:\shttp\:\/\//ig
	var match;
	var max=0;
	while(match=reg.exec(val)){
		if(max<parseInt(match[1],10)){
			max=parseInt(match[1],10);
		}
	}
	var imgText="";
	try{
		var id=$('[name="thumbupload-options-bx"][checked]').attr('id').replace("thumbupload-option-","");
	}catch(e){
		var	id="";	
	}
	switch(id){
		case "bypass":
			imgText=["![%t%][%n%]",result];	
			break;
		case "large":
			imgText=["![%t%][%n%]",result.replace(/\.([^\.]*)$/, 'l.$1')];
			break;
		case "medium":
			imgText=["![%t%][%n%]",result.replace(/\.([^\.]*)$/, 'm.$1')];
			break;	
		case "small":
			imgText=["![%t%][%n%]",result.replace(/\.([^\.]*)$/, 's.$1')];
			break;	
		default:
			imgText=["<img src='"+result+"' title=\"%t%\" height='"+$("#thumbupload-option-height").attr('value')+"' width='"+$("#thumbupload-option-width").attr('value')+"'>",""];
			break;																																				 
	}
	if(imgText[1]){
		
		imgText[0]=imgText[0].replace("%n%",(++max))
		tEnd+="\n  ["+max+"]: "+imgText[1];

	}
	if($('#thumbupload-option-linkify').attr('checked')){
		imgText[0]=(" ["+imgText[0]+"]["+(++max)+"]")
		tEnd+="\n  ["+(max)+"]: "+result;		
	}
		
	if(title==""){
		title="enter image description here";	
	}
	if(imgText[0].indexOf("%t%")!=-1){
		var strs=imgText[0].split("%t%");
		node.value=tBeg+strs[0]+title+strs[1]+tEnd;
		node.selectionStart=(tBeg+strs[0]).length;
		node.selectionEnd=(tBeg+strs[0]+title).length;
	}else{
		node.value=tBeg+imgText[0]+tEnd;
		node.selectionStart=(tBeg+imgText[0]).length;
		node.selectionEnd=node.selectionStart;
	}
	window.parent.ThumbnailUpload.closeModal();
}
window.displayUploadError=function(error){
	$('.ac_loading').hide();
	$('.upload-message').html('<span style="color:red;">'+error+'</span>').show();
	
}





}

ThumbnailUpload.addButton=function(text,callback,identify,pic,tooltip,force){
	//Callback must take id of textarea as argument.
	force = typeof force !== 'undefined' ? force : false;
	var tas=force?$('.wmd-container'):$('.wmd-container').not(".canhasbutton"+identify);
	$.each(tas,function(){
		try{
			if($(this).find("[id^=wmd-button-row]").length==0){
				setTimeout(function(){addButton(text,callback,identify,pic,true)},100);
				return;
			}else{
			
				this.className+=" canhasbutton"+identify
			}
			tid=$(this).find("[id^=wmd-input]")[0].id;
			row=$(this).find("[id^=wmd-button-row]")[0];
			lastel=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
			if(lastel.length>0){
				px=parseInt(lastel[0].style.left.replace("px",""))+25;
				//add code for background-position of span as well later
				btn='<li class="wmd-button" style="left: '+px+'px; "><span style="background-image:url('+pic+');text-align:center;">'+text+'</span></li>';
				
				$(btn).on("click",function(){callback(tid)}).attr("title",tooltip).insertAfter(lastel);
				
				btn=$(row).find(".wmd-button").not(".wmd-help-button").filter(":last");
				if(pic==""){
					$(btn).children('span').hover(function(){$(this).css('background','#DEEDFF')},function(){$(this).css('background','none')});
				}
			}
			
		}catch(e){console.log(e)}
	})
}

//ThumbnailUpload.addButton("T",ThumbnailUpload.showModal,"TU","","tooltip here",false)
	
	
}


//-------------
$(document).ready(function(){
	ThumbnailUpload.addButton("T",ThumbnailUpload.showModal,"TU","","tooltip here",false)
	$("textarea.wmd-input").live("focus",function(){ThumbnailUpload.addButton("T",ThumbnailUpload.showModal,"TU","","tooltip here",false)});
});

})();

