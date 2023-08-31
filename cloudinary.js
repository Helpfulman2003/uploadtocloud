const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}

module.exports = uploadToCloudinary;
