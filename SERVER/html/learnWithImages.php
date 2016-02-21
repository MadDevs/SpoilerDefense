<?php

	require_once 'Unirest.php';
	//API STUFF
	include('Kairos.php');
	include('helper.php');
	
	//$app_id  = '';
	//$api_key = '';
	
	$app_id  = '';
	$api_key = '';

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
			//$results = format_json($responseKairos, true);
			array_push($responseArray, $responseKairos);
			
			
			
		}
	}
	
	$entryID = $nombre;
	
	$responseL = Unirest\Request::post("https://lambda-face-recognition.p.mashape.com/album_train",
        array(
        //   "X-Mashape-Key" => "",
            "X-Mashape-Key" => "",
        ),
        array(
            "album" => "hackMTY",
            //            "albumkey" => "",
            "albumkey" => "",
            "entryid" => $entryID,
            "urls" => $longString
        )
    );

//    $responseL = Unirest\Request::get("https://lambda-face-recognition.p.mashape.com/album_rebuild?album=hackmty&albumkey=",

    $responseL = Unirest\Request::get("https://lambda-face-recognition.p.mashape.com/album_rebuild?album=hackMTY&albumkey=",
        array(
            "X-Mashape-Key" => "",
            // "X-Mashape-Key" => "",

        )
    );

	
	echo var_dump($responseArray);
	echo var_dump($response);
	echo var_dump($responseL);
		
?>