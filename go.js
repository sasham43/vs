var Scraper = require("image-scraper");
const rp = require('request-promise');
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const $ = require('cheerio');



// var url = "https://apod.nasa.gov/apod/astropix.html";
var url = "http://www.tenmanga.com/chapter/VinlandSaga1/493846-1.html";

var max = 0;

rp(url)
    .then(function (html) {
        //success!
        // console.log(html);
        console.log('\n')
        var select = $('select.sl-page', html);
        // console.log(select.children())
        var options = select.children();
        // console.log('options', options, Object.keys(options))

        for (var key in options){
            // console.log('opt', key, options[key].children)
            if (options[key].children && options[key].children[0] && options[key].children[0].data){
                // console.log('data:', options[key].children[0].data)
                // console.log(options[key].children[0].data.split('/'))
                var temp_max = options[key].children[0].data.split('/')[1]
                if(temp_max >= max){
                    max = temp_max
                    // console.log('go')
                } else {
                    // console.log(temp_max, max)
                }
            }
        }

        console.log('max = ', max)

        // options.forEach(function(opt){
        //     console.log('opt', opt, opt.children)
        // })
    })
    .catch(function (err) {
        //handle error
        console.log('error:', err)
    });

// var scraper = new Scraper(url);

// scraper.scrape();

// scraper.on("image", function (image) {

//     // Do something.	
//     console.log(image)
// });