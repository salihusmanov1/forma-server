const sharp = require('sharp');

const resizeTemlateImage = async (buffer) =>
  sharp(buffer)
    .resize(1280, 720, { fit: 'cover' })
    .toBuffer()

module.exports = resizeTemlateImage
