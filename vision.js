// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// var Jimp = require('jimp')
const Canvas = require('canvas')
const fs = require('fs')
const path = require('path');

// Creates a client
const client = new vision.ImageAnnotatorClient();

var file = './images/22-0.jpg'

// Performs label detection on the image file
client
  .documentTextDetection(file)
  .then(results => {
      console.log('results:', results)
    const labels = results[0].textAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description, label.boundingPoly.vertices));

    // read image
    const myimg = Canvas.loadImage(file)
    myimg.then((image) => {
        // do something with image
        console.log('got an image?', image)
        for (key in image){
            console.log('key', key)
        }
        const canvas = Canvas.createCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        ctx.fillRect(0, 0, 150, 150) // Draw a rectangle with default settings
        ctx.save() // Save the default state

        // write file
        canvas.createPNGStream()
        .pipe(fs.createWriteStream(path.join(__dirname, 'output/output.png')))

    }).catch(err => {
        console.log('oh no!', err)
    })
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
