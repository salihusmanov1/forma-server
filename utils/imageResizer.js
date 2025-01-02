const sharp = require('sharp');

const resizeTemplateImage = async (buffer) =>
  sharp(buffer)
    .resize(1280, 720, { fit: 'cover' })
    .toBuffer()

module.exports = resizeTemplateImage
