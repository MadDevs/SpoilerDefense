﻿
console.log("added");

$( document ).on('ready', function() {
   $("#submitLink").on("click", function(event){

    event.preventDefault();    
    var str = $("#textAreaId").val()
    var partsOfStr = str.split(',');
    var str2 = str.replace(/\s/g, '');
    var jsonObject = {
        "longString" : str2,
        "nombre" : $("#name").val(),
        "urls" : []
    };

    for (var i = 0; i < partsOfStr.length; i++) {
        jsonObject.urls.push({'url': partsOfStr[i]});
                //Do something
                
            }
                
                

                
                $.ajax({
                     type: "POST",
                     url: "http://localhost/learnWithImages.php",
                     //dataType: "json",
                     data: jsonObject,
                     //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                     success: function(jsonData) {
                        console.log(jsonData);
                        setTimeout(function() {$("#success").show();}, 100);
                        setTimeout(function() {$("#success").hide();}, 5000); 

                     },//"Good job!", "You clicked the button!", "success"
                    
                    
                     error: function(errorMsg){
                         console.log(errorMsg);

                     }
                 });
                
                
            });


});


$("#formaid").on("click", function(event) {
    event.preventDefault();    
});
