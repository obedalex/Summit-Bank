const cloudinary = require("../config/cloudinary.config");
const streamifier = require("streamifier"); 
const uploadToCloudinary = (buffer, folder, context = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        context, // store arbitrary key/value pairs like fileHash
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}; 

module.exports = { uploadToCloudinary };