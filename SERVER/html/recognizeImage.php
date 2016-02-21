<?php

	header('Access-Control-Allow-Origin: *');
	require_once 'Unirest.php';

	//API STUFF
	include('Kairos.php');
	include('helper.php');
	
	$app_id  = '6ce41aa5';
	$api_key = '6886ce557b7651a70f89c84f46740244';

	$Kairos  = new Kairos($app_id, $api_key);

	$URL = $_POST['url'];
	//echo $URL;
	
	//KAIROS API
	$image_path = $URL;
	//echo var_dump($URL)
	$gallery_id = "Tests1";
	
	$response = $Kairos-> recognizeImageWithData($image_path, $gallery_id); //detectImageWithPath($image_path, $gallery_name);
	//$results = format_json($response, true);
	$response = json_decode($response, true);
	
	// try{
// 		JSON.parse($response['images']);
// 		
// 	}catch(e){
// 		echo "NO IMAGE FOUND MTHFCKR"
// 	}


//LAMBDA
// Recognize
    $responseL = Unirest\Request::post("https://lambda-face-recognition.p.mashape.com/recognize",
        array(
            "X-Mashape-Key" => "SnEuiYSjzhmsh6FcQM4HD9zXP3ixp1iIACMjsnqpJHt6bhftiN",
            //"Content-Type" => "application/x-www-form-urlencoded",
            //"Accept" => "application/json"
        ),
        array(
            "album" => "hackmty",
            "albumkey" => "b2c4c250346cd9e4b3bc97d39ad916e5fe57710bd00162f00ffbc84b0cdd2a0d",
            "urls" => $URL
        )
    );
    
    // Reformat JSON
    $json = json_encode($responseL);
    $ans = json_decode($json, true);
    // Important data
    $body = $ans['body'];
    $result = $body['status'];
    $photos = $body['photos'];
    $data = $photos[0];
    $tags = $data['tags'];
    $dataTags = $tags[0];
    // Results
    $matches =  $dataTags['uids'];
    $person = $matches[0];
    $confidenceL = $dataTags['confidence'];
    // Person
    $pConfidence = floatval($person['confidence']);
    $name = $person['prediction'];
    
	
	///RESULTS parseFloat("10.33")
	$status = ($response['images']['0']['transaction']['status']);
	$confidence = floatval($response['images']['0']['transaction']['confidence']);
	$subject = ($response['images']['0']['transaction']['subject']);
	//echo $status." ".$confidence." ".$subject." :2: ".$pConfidence." ".$name;
	
	if($pConfidence >= 0.7 || $confidence >= 0.8){
		echo 1;
	}
	else if($pConfidence >= 0.5 || $confidence > 0.6){
		echo 2;
	}else if ($subject == $name){
		echo 2;
	}else{
		echo 3;
	}
	
	

?>