const express = require('express')
const multer = require('multer')
const googleHandler = require('./googleHandler')
const app = express()

const multerMiddleware = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

app.post('/processImage', multerMiddleware.single('file'), googleHandler.sendToStorage, (req, res, next) => {
  return res.status(200).json(req.file);
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