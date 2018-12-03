// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

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
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
