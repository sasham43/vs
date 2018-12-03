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
    // labels.forEach(label => console.log(label.description, label.boundingPoly.vertices));

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
        // ctx.fillRect(269, 655, 5, 5) // Draw a rectangle with default settings

        // test
        // 0 - top left
        // 1 - top right
        // 2 - bottom right
        // 3 - bottom left
        labels.forEach((label, index)=>{
            if(index != 0){
                var box = label.boundingPoly.vertices;
                var width = box[1].x - box[0].x
                var height = box[2].y - box[0].y
                console.log(label.description, box,  width, height)
                ctx.fillStyle = '#FFF'
                ctx.fillRect(box[0].x, box[0].y, width, height)
                ctx.fillStyle = '#000'
                ctx.fillText(label.description, box[0].x, box[0].y)
            }
        })

        // var boy = [ { x: 246, y: 655 },
        //           { x: 269, y: 655 },
        //           { x: 269, y: 665 },
        //           { x: 246, y: 665 } ]
        //
        // var width = boy[1].x - boy[0].x
        // var height = boy[2].y - boy[0].y
        // console.log('widht', width, height)
        // ctx.fillRect(boy[0].x, boy[0].y, width, height)


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
