const GoogleCloudStorage = require('@google-cloud/storage')
  
const GOOGLE_CLOUD_PROJECT_ID = 'annular-garden-313509'
const GOOGLE_CLOUD_KEYFILE = './key.json'

const { Storage } = GoogleCloudStorage
exports.storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
})

exports.getUrl = (bucket, file) => `https://storage.googleapis.com/${bucket}/${file}`