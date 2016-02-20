    //nCage 
    (function($) {
 
        var self = {
           
            //Handles all images on page with an interval of time
            handleImages: function(lstImgs, time) {

                $.each($('img'), function(i, item) {
                    //Skip if image is already replaced
                    
                    console.log("test" + i);
                });
 
                //Keep replacing
                if (time > 0) {
                    setTimeout(function() {
                        self.handleImages(lstImgs, time);
                    }, time);
                }
            }
        };
 
        //Run on jQuery ready
        $(function() {
 
            self.handleImages(self.nCageImgs, 3000);
 
        });
 
        //Set global variable
        $.nCage = self;
 
 
    })(jQuery);
    //end nCage


chrome.tabs.executeScript({file: "scrape.js"}, function() {
        console.log("content loaded");
    });