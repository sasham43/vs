var Scraper = require("image-scraper");
const rp = require('request-promise');
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const $ = require('cheerio');



// var url = "https://apod.nasa.gov/apod/astropix.html";
var url = "http://www.tenmanga.com/chapter/VinlandSaga1/493846-1.html";

var max = 0;

var pages = [];

rp(url)
    .then(function (html) {
        //success!
        console.log('\n')
        var select = $('select.sl-page', html);
        var options = select.children();

        // loop through the page selector and find out how many pages there are
        for (var key in options){
            if (options[key].children && options[key].children[0] && options[key].children[0].data){
                var temp_max = options[key].children[0].data.split('/')[1]
                if(temp_max >= max){
                    max = temp_max
                }
            }
        }

        console.log('max = ', max)

        for (var i = 1; i <= max; i++){
            pages.push({
                page: i,
                url: `http://www.tenmanga.com/chapter/VinlandSaga1/493846-${i}.html`
            });
        }

        pages.forEach(function(page){
            var scraper = new Scraper(page.url);
            var img_count = 0;
            scraper.scrape(function(image){
                if(img_count == 0){
                    image.name = `${page.page}-${img_count}`;
                    image.saveTo = '/Users/sashakramer/art/vs/images/';
                    image.save();
                }
                img_count++;
            });
        })
    })
    .catch(function (err) {
        //handle error
        console.log('error:', err)
    });

// var scraper = new Scraper(url);
// scraper.scrape(function (image) {
//     image.saveTo = '/Users/sashakramer/art/vs/images/';
//     image.save();
// });

// scraper.scrape();

// scraper.on("image", function (image) {

//     // Do something.	
//     console.log(image)
// });