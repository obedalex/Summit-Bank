const multer = require("multer");

// Memory storage for cloud upload
const storage = multer.memoryStorage();

// Factory function for creating upload instances
const createUpload = (allowedMimeTypes) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file type: ${file.mimetype}`), false);
      }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  });


// Upload configs
const uploadPDF = createUpload(["application/pdf"]);
const uploadImages = createUpload(["image/jpeg",  "image/avif",
 "image/png", "image/jpg","image/webp"]);
const uploadVideos = createUpload(["video/mp4", "video/webm", "video/ogg"]);
const uploadAudio = createUpload(["audio/mpeg"]); // mp3
const uploadExcels = createUpload([
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "text/csv" // .csv
]);

module.exports = {
  uploadPDF,
  uploadImages,
  uploadVideos,
  uploadAudio,
  uploadExcels
};



