// let path = require("path");

// module.exports = function(folderPath, type) {
//   return function(req, res, next) {
//     if (req.files == null) return next();

//     const file =
//       type == "profilepic" ? req.files.profilePic : req.files.postImage;
//     console.log(file);

//     const fileExt = file.name.split(".").pop();

//     let filename = "";
//     if (type == "profilepic") filename = res.locals.user_id + "." + fileExt;
//     else if (type == "post")
//       filename =
//         file.name.split(".")[0] + "_" + res.locals.user_id + "." + fileExt;
//     res.locals.filename = filename;
//     console.log("In save Image: " + filename);
//     console.log("__dirname: " + __dirname);
//     const fullPath = path.join(__dirname, folderPath, filename);
//     console.log("fullpath: " + fullPath);
//     file.mv(fullPath, err => {
//       if (err) return next(err);
//       return next();
//     });
//   };
// };

var multer = require("multer");
var multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const config = require("../config.json");
const s3 = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.S3_SECRET_ACCESS_KEY,
  Bucket: config.S3_BUCKET_NAME,
});

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}
let fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "social-media-mern-bucket",
    key: function (req, file, cb) {
      cb(
        null,
        (file.fieldname === "postImage" ? "posts/" : "profilepics/") +
          path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = function (fieldname) {
  return function (req, res, next) {
    if (!fieldname) return next();
    fileUpload.single(fieldname)(req, res, (error) => {
      if (error) {
        console.log("errors", error);
        res
          .status(400)
          .json({ message: error.message ? error.message : error });
      } else {
        // If File not found
        if (req.file === undefined) {
          res.locals.imageURL = "";
          return next();
        } else {
          // If Success
          res.locals.imageURL = req.file.location;
          return next();
        }
      }
    });
  };
};
