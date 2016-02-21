// chrome.tabs.executeScript({file: "/lib/js/scrape.js"}, function() {
// 	console.log("content loaded");
// });

var jsonOject = { 
	"url": "http://vignette2.wikia.nocookie.net/breakingbad/images/9/98/Season_4_-_Jesse.jpg/revision/latest?cb=20110620212155"
};
$.ajax({
	type: "POST",
	url: "http://104.236.19.222/recognizeImage.php",
	data: jsonOject,
	success: function(jsonData) {
		console.log(jsonData);
	},
	error: function(errorMsg){
		console.log(errorMsg);
	}
});

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "knockknock");
	port.onMessage.addListener(function(msg) {
		if (msg.joke == "Knock knock")
		{
			port.postMessage({question: "Who's there?"});
			console.log("Whos there");
		}
		else if (msg.answer == "Madame")
		{
			port.postMessage({question: "Madame who?"});
			console.log("Knock");
		}
		else if (msg.answer == "Madame... Bovary")
		{
			port.postMessage({question: "I don't get it."});
			console.log("no thnka");
		}
	});
});