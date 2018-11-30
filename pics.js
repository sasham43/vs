var Jimp = require('jimp')
var floydSteinberg = require('floyd-steinberg');

var AtkinsonDither = require('atkinson-dither');

var Dither = require('image-dither');

var options = {matrix: Dither.matrices.sierra2};
var dither = new Dither(options);

// var ditheredImg = dither.dither(img, imgWidth);

// open a file called "lenna.png"
var name = 0;
for (var i = 1; i < 30; i++){

    Jimp.read(`images/${i}-0.jpg`, (err, pic) => {
        if (err) throw err;
        name++
        pic

            // pic.bitmap = floydSteinberg(pic.bitmap)
            // pic.bitmap = AtkinsonDither.ProcessImage(pic.bitmap);
            console.log('pic', pic.bitmap.width)

            try {
                var new_img = dither.dither(pic.bitmap.data, pic.bitmap.width);
            } catch (e){
                console.log('pre err', e)
            }
            // pic.resize(Jimp.AUTO, 600) // resize
            //
            // pic.write(`atkinson/${name}.bmp`); // save
            try {
                new Jimp(pic.bitmap.data, pic.bitmap.width, function(err, new_container){
                    if (err) console.log('fail', err)
                    console.log('pic2')
                    for (i in new_img) {
                        new_container.bitmap.data[i] = new_img[i]
                    }
                    new_container.resize(Jimp.AUTO, 600) // resize

                    new_container.write(`atkinson/${name}.bmp`); // save
                })
            } catch (e){
                console.log('super fail')
            }

    });
}

// Jimp.read('images/1-0.jpg', (err, pic) => {
//     if (err) throw err;
//     pic
//         .resize(600, Jimp.AUTO) // resize
//         .quality(60) // set JPEG quality
//         .greyscale() // set greyscale
//         .contrast(1)
//         .write('pic-small.bmp'); // save
// });

// Jimp.read(filename, function (err, image) {
//     if (err) throw err;
//     image.autocrop().scaleToFit(256, 256)
//     //.rgba(false).greyscale().contrast(1).posterize(2)
//     image.bitmap = floydSteinberg(image.bitmap)
//     image.write("out.png")
// })
