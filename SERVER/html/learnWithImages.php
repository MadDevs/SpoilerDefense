<?php

	require_once 'Unirest.php';
	//API STUFF
	include('Kairos.php');
	include('helper.php');
	
	$app_id  = '6ce41aa5';
	$api_key = '6886ce557b7651a70f89c84f46740244';

	$Kairos  = new Kairos($app_id, $api_key);

	$longString = $_POST['longString'];
	$nombre = $_POST['nombre'];
	$responseArray = array();
	$stuff = $_POST['urls'];
	
	foreach($stuff as $key){
		foreach($key as $key2){
			//KEY2 is a URL
			
			//Kairos API
			$gallery_id = 'Tests1';
			$subject_id = $nombre;
			$image_path = $key2;
			//$image_data = imageDataFromFilePath($image_path);
			$responseKairos = $Kairos->enrollImageWithData($image_path, $gallery_id, $subject_id);
			$results = format_json($responseKairos, true);
			array_push($responseArray, $results);
			
			
			
		}
	}
	
	$entryID = $nombre;
	
	$responseL = Unirest\Request::post("https://lambda-face-recognition.p.mashape.com/album_train",
        array(
            "X-Mashape-Key" => "SnEuiYSjzhmsh6FcQM4HD9zXP3ixp1iIACMjsnqpJHt6bhftiN",
        ),
        array(
            "album" => "hackmty",
            "albumkey" => "b2c4c250346cd9e4b3bc97d39ad916e5fe57710bd00162f00ffbc84b0cdd2a0d",
            "entryid" => $entryID,
            "urls" => $longString
        )
    );


    $responseL = Unirest\Request::get("https://lambda-face-recognition.p.mashape.com/album_rebuild?album=hackmty&albumkey=b2c4c250346cd9e4b3bc97d39ad916e5fe57710bd00162f00ffbc84b0cdd2a0d",
        array(
            "X-Mashape-Key" => "SnEuiYSjzhmsh6FcQM4HD9zXP3ixp1iIACMjsnqpJHt6bhftiN",
        )
    );

	
	echo var_dump($responseArray);
	echo var_dump($response);
	echo var_dump($responseL);
		
?>