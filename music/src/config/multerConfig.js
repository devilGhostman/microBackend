const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function checkFileType(file, cb) {
  const filetypes = /mp3|wav|flac/;
  const mimetypes = /audio\/mpeg|audio\/wav|audio\/flac/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: mp3,wav,flac file type Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
