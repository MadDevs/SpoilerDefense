<?php
	//API STUFF
	include('Kairos.php');
	include('helper.php');
	
	
	$nombre = $_POST['nombre'];

	$urlArray = array();
	
	$stuff = $_POST['urls'];
	
	foreach($stuff as $key){
		foreach($key as $key2){
			//$all.=$key2." ";
			array_push($urlArray, $key2);
		}
	}
	
	///echo var_dump($urlArray);
	
	
	
	


//* * * * sample api credentials (works for example)
$app_id  = 'e2a8eaa7';
$api_key = '4092e4a45070bca728644e9285f084b4';

//* * * * create a new instance and authenticate
$Kairos  = new Kairos($app_id, $api_key);

/*
 In this example, we enroll a
 subject into a gallery using a
 path to an image file. */
$image_path = 'assets/images/sample.jpg';
$image_data = imageDataFromFilePath($image_path);
$options = array('selector'=>'FULL');
$response = $Kairos->detectImageWithData($image_data);

echo '<br /><b>Response:</b><br />';
echo '<div class="text-left" style="padding:10px;border:1px solid rgba(51, 51, 51, 0.08);background-color: rgba(204, 204, 204, 0.26);"><br />';
echo format_json($response, true);
echo '</div>';

	
	
	
	
	?>