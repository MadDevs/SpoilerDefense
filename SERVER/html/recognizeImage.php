<?php

	header('Access-Control-Allow-Origin: *');
	require_once 'Unirest.php';

	//API STUFF
	include('Kairos.php');
	include('helper.php');
	
	//$app_id  = '';
	//$api_key = '';
	
	$app_id  = '';
	$api_key = '';

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
			 //"X-Mashape-Key" => "",
			 "X-Mashape-Key" => "",
            //"Content-Type" => "application/x-www-form-urlencoded",
            //"Accept" => "application/json"
        ),
        array(
            "album" => "hackMTY",
		   "albumkey" => "",
		   //"albumkey" => "",
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
    
	//echo var_dump($response);
	///RESULTS parseFloat("10.33")
	$status = ($response['images']['0']['transaction']['status']);
	$confidence = floatval($response['images']['0']['transaction']['confidence']);
	$subject = ($response['images']['0']['transaction']['subject']);
	//echo $status." ".$confidence." ".$subject." :2: ".$pConfidence." ".$name;
	
	// answer
	$grade = 0;
	
	if($pConfidence >= 0.7 || $confidence >= 0.8){
		$grade = 1;
	}
	else if($pConfidence >= 0.6 || $confidence > 0.6){
		$grade = 2;
	}else if ($subject == $name){
		$grade = 2;
	}else{
		$grade = 3;
	}
	
	$answer = array('grade' => $grade, 'name' => $subject, 'name2' => $name, 'firstAPI' => $confidence, 'secondAPI' => $pConfidence, 'url' => $URL);
	echo json_encode($answer);

?>