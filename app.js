const express = require('express')
const multer = require('multer')
const googleHandler = require('./googleHandler')
const request = require('request')
const app = express()

const multerMiddleware = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

app.post('/processImage', multerMiddleware.single('file'), googleHandler.sendToStorage, (req, res, next) => {
  var filename = googleHandler.passThisFilename
  const link = "https://us-central1-annular-garden-313509.cloudfunctions.net/diseasePrediction-3/prediction?imagePath=https://storage.googleapis.com/annular-garden-313509/" + filename
  request(link, function (error, response, body) {
    console.error('error:', error); // Print the error
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the data received
    return res.status(200).send(body); //Display the response on the website
  });
  // return res.status(200).json(req.file);
})

app.get('/uploads', async (req, res, next) => {
  const dummy = {
    disease: "TEST DISEASE",
    percent: 70
  }
  res.status(200).json({
    result: [
      dummy
    ]
  })
})

var listener = app.listen(80, () => {
  console.log(`Listening on port ${listener.address().port}`)
})

module.exports = app
module.exports = { app }
