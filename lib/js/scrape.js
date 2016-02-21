



    //nCage 
    (function($) {

        var self = {

            //Handles all images on page with an interval of time
            handleImages: function( time) {

                var elements = document.querySelectorAll('._4ikz .mtm  img');

                $.each(elements, function(i, item) {
                    //Skip if image is already replaced
                    
                    //console.log(item);

                    if ( (($(item).attr("class") == "spoiler") == false )   && (($(item).attr("class") == "spoiler-revealed") == false)) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //If image loaded
                        if (h > 0 && w > 0) {
                            self.handleImg(item, );
                        } else {
                            //Replace when loaded
                            $(item).load(function() {
                                    //Prevent 'infinite' loop
                                    if ( (($(item).attr("class") == "spoiler") == false )   && (($(item).attr("class") == "spoiler-revealed") == false)) {

                                        self.handleImg(item );
                                    }
                                });
                        }
                    }
                });

                //Keep replacing
                if (time > 0) {
                    setTimeout(function() {
                        self.handleImages( time);
                    }, time);
                }

            },
            handleImg: function(item ) {
                $(item).error(function() {
                            //Handle broken imgs
                            console.log("broken image");
                          // self.handleBrokenImg(item, );
                      });

                self.hideImage(item);

            },
            hideImage: function(item) {

                if ( (($(item).attr("class") == "spoiler") == false )   && (($(item).attr("class") == "spoiler-revealed") == false)
                    && !($(item).parent().hasClass("_38vo") || $(item).parent().parent().hasClass("_ohe"))) {
                    $(item)
                        .attr('class', "spoiler")
                        .pixelate({ value: 0.1, reveal : true });
                }


                var jsonOject = { 
                    "url": $(item).attr('src')
                };

                var port = chrome.runtime.connect({name: "spoilerRecognize"});
                port.onMessage.addListener(function(msg) {
                    
                    if (jQuery.parseJSON(msg.answer).grade != 1 ) {
                        console.log("Remove canvas");
                        $(item).show();
                        $(item).removeClass('spoiler');
                        $(item).addClass('spoiler-revealed');
                        $(item).siblings('canvas').remove();

                    }
                    
                }); 
                
                if(!($(item).parent().hasClass("_38vo") || $(item).parent().parent().hasClass("_ohe")) 
                    && (($(item).attr("class") == "spoiler") == true )   
                    && (($(item).attr("class") == "spoiler-revealed") == false)) {

                    port.postMessage({name: "image", url: jsonOject.url});
                    
                }
                



            }
        };



        //Run on jQuery ready
        $(function() {

            self.handleImages(2000);

        });
        
        //Set global variable
        $.nCage = self;


    })(jQuery);
    //end nCage
