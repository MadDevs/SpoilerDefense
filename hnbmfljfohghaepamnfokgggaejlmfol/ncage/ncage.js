var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
        track(items.activate ? "true" : "false");
    });
} catch (e) {
    if (active) {
        main();
    }
    track("undefined");
}

function track(active) {
    //Analytics
    var _gaq = window._gaq || [];
    _gaq.push(['_setAccount', 'UA-43973753-3']);
    _gaq.push(['_gat._forceSSL']);
    _gaq.push(["_setCustomVar", 1, "Active", active, 3]);
    _gaq.push(['_trackPageview']);
}

//Content script, image replacer
function main() {
    
    //nCage 
    (function ($) {

        var self = {
            nCageImgs: [
            'http://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg',
            'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg/220px-Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg',
            'http://content8.flixster.com/rtactor/40/33/40334_pro.jpg',
            'http://images.fandango.com/r88.0/ImageRenderer/200/295/images/performer_no_image_large.jpg/0/images/masterrepository/performer%20images/p10155/kickass-pm-4.jpg',
            'http://topnews.in/files/Nicolas-Cage_0.jpg',
            'http://i0.kym-cdn.com/entries/icons/original/000/006/993/1817.jpg',
            'http://images.trulia.com/blogimg/9/d/7/d/1775659_1302741896636_o.jpg',
            'http://cache2.artprintimages.com/LRG/10/1062/Y4UL000Z.jpg',
            'http://www3.pictures.fp.zimbio.com/Nicholas+Cage+David+Letterman+-EtX2RCI91al.jpg',
            'http://resources2.news.com.au/images/2009/11/04/1225794/400950-nicolas-cage.jpg',
            'http://2.bp.blogspot.com/-YRqSEM3HY-I/UCnI3Q9t8EI/AAAAAAAAEW8/hKt3GlOgwbY/s1600/nicolas-cage11.jpg',
            'http://d2tq98mqfjyz2l.cloudfront.net/image_cache/1335739369248357_animate.gif',
            'http://thetrustadvisor.com/wp-content/uploads/2013/03/nicolas-cage.jpg',
            'http://starsmedia.ign.com/stars/image/article/908/908074/nicolas-cage-20080905025038648-000.jpg',
            'http://images.latinospost.com/data/images/full/10956/nicolas-cage.jpg',
            'http://wpc.556e.edgecastcdn.net/80556E/img.news/NEPYPT3WQzBeUP_1_1.jpg',
            'http://www.iwatchstuff.com/2012/11/30/nic-cage-in-things.jpg',
            'http://images.contactmusic.com/newsimages/nicolas_cage_552048.jpg',
            'http://www.apnatimepass.com/nicolas-cage-in-stolen-movie-10.jpg',
            'http://static2.businessinsider.com/image/4adcd99800000000009ed0dd/how-nicolas-cage-spent-his-way-to-the-poorhouse.jpg',
            'http://www1.pictures.zimbio.com/pc/Nicolas+Cage+Nicolas+Cage+Emma+Stone+Croods+AbN87pQpWsjl.jpg',
            'http://hsstorewebproject.weebly.com/uploads/2/0/2/7/20276235/3310319_orig.jpg',
            'http://www.wow247.co.uk/wp-content/uploads/2013/08/Nicolas-Cage-ghost-rider.jpg',
            'http://cinemastationblog.files.wordpress.com/2011/12/cage_vampireskiss.jpg',
            'http://www.cosmo.com.ua/i/photos_publication/1627/400_535/H88d0tP2.jpg',
            'http://cdn-media.extratv.com/archive/images/news/0418/nic-cage.jpg',
            'http://31.media.tumblr.com/tumblr_ljygvqVZhC1qzl30go1_400.png',
            'http://static.lexpress.fr/medias_1457/w_605,h_454,c_fill,g_north/u-s-actor-nicolas-cage-poses-for-a-portrait-in-a-central-london-hotel_746064.jpg',
            'http://i1.ytimg.com/vi/ghhpe7n7Gi0/maxresdefault.jpg',
            'http://31.media.tumblr.com/tumblr_m2wkus8ilr1r4etbjo1_r1_500.gif',
            'http://docfilms.uchicago.edu/dev/images/2014/winter/2014-01-30-02.jpg',
            'http://38.media.tumblr.com/tumblr_ls47w7ZoeN1qbgguvo1_1280.png',
            'http://ughalex.files.wordpress.com/2013/05/tumblr_lxamtuvmvq1r4etbjo1_5001.gif?w=820',
            'http://25.media.tumblr.com/tumblr_llhctdm0jU1qje621o1_500.gif',
            'http://www.ramascreen.com/wp-content/uploads/2013/07/Nicolas-Cage-574x319.jpg',
            'https://pmcvariety.files.wordpress.com/2015/01/nicolas-cage-army-of-one.jpg?w=450&h=340&crop=1',
            'http://www.empireonline.com/images/uploaded/nicolas-cage.jpg',
            'http://images.thehollywoodgossip.com/iu/s--ssVDTDTP--/t_teaser_wide/f_auto,fl_lossy,q_75/v1420733814/nic-cage-is-nuts.png',
            'http://esq.h-cdn.co/assets/cm/15/06/54d3d4cbe7b17_-_ibfoqbt169nmnw.gif',
            'http://capcityradio.net/b945live/wp-content/uploads/sites/7/2015/04/Nicolas-cage-good-photos.jpg',
            'http://www.picgifs.com/reaction-gifs/reaction-gifs/laughing/picgifs-laughing-35443.gif',
            'https://38.media.tumblr.com/6f078476478c216df762136d295af27b/tumblr_nhto03KxKB1rvzbdgo1_500.gif',
            'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2009/9/24/1253807276915/Nicolas-Cage-001.jpg',
            ],

            //Handles all images on page with an interval of time
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
                    //Skip if image is already replaced
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //If image loaded
                        if (h > 0 && w > 0) {

                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //Replace when loaded
                            $(item).load(function () {
                                //Prevent 'infinite' loop
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                //Keep replacing
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Replace one image
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //Handle broken imgs
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
            //Set a random image from lstImgs to item 
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },
            //Removed broken image from lstImgs, run handleImg on item
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //Run on jQuery ready
        $(function () {

            self.handleImages(self.nCageImgs, 3000);

        });

        //Set global variable
        $.nCage = self;


    })(jQuery);
    //end nCage
}
