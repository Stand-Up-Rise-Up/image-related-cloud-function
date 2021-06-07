const googleHelper = require('./google')
const { storage } = googleHelper
const DEFAULTBUCKETNAME = "annular-garden-313509"
var passThisFilename = ""

exports.sendToStorage = (req, res, next) => {
  if (!req.file) { return next() }
  const bucketName = req.body.bucketName || DEFAULTBUCKETNAME
  console.log(bucketName)
  const bucket = storage.bucket(bucketName)
  const fileName = `${Date.now()}-${req.file.originalname}`
  const file = bucket.file(fileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimeType
    }
  })

  stream.on("error", (error) => {
    req.file.cloudStorageError = error
    next(error)
  })
  stream.on("finish", () => {
    req.file.cloudStorageObject = fileName

    return file.makePublic()
      .then(() => {
        req.file.fileUrl = googleHelper.getUrl(bucketName, fileName)
        next()
      })
  })
  passThisFilename = fileName
  stream.end(req.file.buffer)
}

exports.passThisFilename = passThisFilename;
