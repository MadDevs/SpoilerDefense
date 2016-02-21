// chrome.tabs.executeScript({file: "/lib/js/scrape.js"}, function() {
// 	console.log("content loaded");
// });

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "spoilerRecognize");
	port.onMessage.addListener(function(msg) {
		if (msg.name == "image")
		{
			var jsonOject = { 
				"url": msg.url
			};
			$.ajax({
				type: "POST",
				url: "http://104.236.19.222/recognizeImage.php",
				data: jsonOject,
				success: function(jsonData) {
					console.log(jsonData);
					port.postMessage({answer: jsonData});
				},
				error: function(errorMsg){
					console.log(errorMsg);
				}
			});
		}
	});
});