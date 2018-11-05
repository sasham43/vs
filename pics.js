var Jimp = require('jimp')

// open a file called "lenna.png"
var name = 0;
for (var i = 1; i < 89; i++){
       
    Jimp.read(`images/${i}-0.jpg`, (err, pic) => {
        if (err) throw err;
        name++
        pic
            .resize(600, Jimp.AUTO) // resize
            // .quality(100) // set JPEG quality
            .greyscale() // set greyscale
            .contrast(1)
            .posterize(2)
            .write(`bitmaps/${name}.bmp`); // save
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