<?php
//http://stackoverflow.com/questions/8544469/jquery-cross-domain-image-upload
//http://stackoverflow.com/questions/298745/how-do-i-send-a-cross-domain-post-request-via-javascript
//
$fkey= $_POST['fkey'];
/*
$imgUrl = $_POST['image_url'];

$imgFile = $_POST['filename'];
*/

//TODO: Fill remaining sites (use regex, doofus)
switch ($_SERVER['HTTP_ORIGIN']) {
    case 'http://meta.stackoverflow.com':
    header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Content-Type');
    break;
}




//Modified from http://www.9lessons.info/2009/03/upload-and-resize-image-with-php.html
define("MAX_SIZE","4000");
echo var_dump($_POST);
$errors=0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if($_FILES["file"]){
		$image =$_FILES["file"]["name"];
   	    $uploadedfile = $_FILES['file']['tmp_name'];
    }else{
		$sp=split('/\\/|\\\\/',$_POST['filename']);
		$image=array_pop($sp);
		$uploadedfile=$_POST['filename'];
		
	}
	echo $uploadedfile."AAAAA".$_POST['filename'];
    if ($image) {
        $filename = stripslashes($image);
        $extension = getExtension($filename);
        $extension = strtolower($extension);
        if (($extension != "jpg") && ($extension != "jpeg")
        && ($extension != "png") && ($extension != "gif")) {
            echo 'ERROR:Unknown image extension'.$extension;
            $errors=1;
        } else {
            $size=filesize($uploadedfile);
            
            if ($size > MAX_SIZE*1024) {
                echo "ERROR:You have exceeded the size limit";
                $errors=1;
            }
            
            if ($extension=="jpg" || $extension=="jpeg" ) {

                $src = imagecreatefromjpeg($uploadedfile);
            } else if ($extension=="png") {

                $src = imagecreatefrompng($uploadedfile);
            } else {
                $src = imagecreatefromgif ($uploadedfile);
            }
            
            list($width,$height)=getimagesize($uploadedfile);
            if($_POST['fileheight']){
            	$newwidth=$_POST['fileheight'];
			}else{
				$newwidth=$_POST['scaleheight']*$height/100;
			}
            $newheight=($height/$width)*$newwidth;
            $tmp=imagecreatetruecolor($newwidth,$newheight);
            
            imagecopyresampled($tmp,$src,0,0,0,0,$newwidth,$newheight,
            $width,$height);

            
            $filename = "images/". $image;

            
            imagejpeg($tmp,$filename,100);
			
                $ch = curl_init();
				curl_setopt($ch, CURLOPT_HEADER, 0);
				curl_setopt($ch, CURLOPT_VERBOSE, 0);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible;)");
				curl_setopt($ch, CURLOPT_URL,$_SERVER['HTTP_ORIGIN'].'/upload/image' );
				curl_setopt($ch, CURLOPT_POST, true);
				$local_directory=dirname(__FILE__).'/';
				$post = array(
					"file"=>"@".$local_directory.$filename,
					"fkey"=>$fkey,
				);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $post); 
				$response = curl_exec($ch);
				echo response;
            imagedestroy($src);
            imagedestroy($tmp);
        }
    }
}
//If no errors registred, print the success message

if (isset($_POST['Submit']) && !$errors) {
    // mysql_query("update SQL statement ");
 //   echo "Image Uploaded Successfully!";
    
}



function getExtension($str) {

         $i = strrpos($str,".");
         if (!$i) { return ""; } 
         $l = strlen($str) - $i;
         $ext = substr($str,$i+1,$l);
         return $ext;
 }
 
 
/*

$.ajax({
    type: 'POST',
    url: 'http://localhost/Git/Manish-Codes/StackExchange/ThumbnailUpload/ThumbnailUpload.php',
    crossDomain: true,
    data: JSON.stringify({"fkey":StackExchange.options.user.fkey,"filename":"http://cdn.sstatic.net/img/hosted/tKsDb.png","scaleheight":50}),
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        console.log(responseData);
		console.log(responseData.responseText);
	//	console.log();
    },
    error: function (responseData, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});


<form action="http://localhost/Git/Manish-Codes/StackExchange/ThumbnailUpload/ThumbnailUpload.php" target="xyz" method=post>
<input type="text" name="filename" value="http://cdn.sstatic.net/img/hosted/tKsDb.png">
<input type="text" name="fkey" onfocus="this.value=StackExchange.options.user.fkey">
<input type="text" name="scaleheight" value="50">
<iframe id="xyz" name="xyz">
</iframe><input type="submit"></form>

*/


?>
