

chrome.tabs.executeScript({file: "/lib/js/scrape.js"}, function() {
        console.log("content loaded");
    });