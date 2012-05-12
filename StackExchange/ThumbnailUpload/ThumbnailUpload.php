<?php
//Stolen from http://files.quickmediasolutions.com/userscripts/circles/process.txt


// We are expecting a file that contains data
// for the actual image *as well as* the original
// image. We also need the scale factor.

$org = $_POST['image_url'];

$img = imagecreatefromstring(file_get_contents($org));

if($img === FALSE)
{
    header('location: http://meta.stackoverflow.com/revisions/ee39363c-1582-40b6-b8be-9ad41e6338ff/view-source?parameterpass=ERROR');
    exit;
}

// Now we create a new one with the dimensions of the first
$final = imagecreatetruecolor(imagesx($circles), imagesy($circles));

// Draw the base picture into it
imagecopyresampled($final, $img, 0, 0, 0, 0, imagesx($circles), imagesy($circles), imagesx($img), imagesy($img));

// Now the second
imagecopy($final, $circles, 0, 0, 0, 0, imagesx($circles), imagesy($circles));

ob_start();
imagepng($final);

// Grab the contents
$actual_data = base64_encode(ob_get_contents());

// Now send it to imgur
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://api.imgur.com/2/upload.json');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'key=4d3814a8e97c14c7424ac34deb6218ff&image=' . urlencode($actual_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// Get the URL
$data = json_decode(curl_exec($ch), true);
$new_url = $data['upload']['links']['original'];

// We finally have the URL!
$portion = str_replace('http://imgur.com/', '', $new_url);
ob_end_clean();

// Now we do something a little weird... we redirect the user to Meta
// with a *very* specially crafted URL. (I'll pick on the Clippy post)
header('location: http://meta.stackoverflow.com/revisions/ee39363c-1582-40b6-b8be-9ad41e6338ff/view-source?parameterpass=' . $portion);

?>