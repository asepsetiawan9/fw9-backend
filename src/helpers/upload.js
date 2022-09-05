// const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryUpload = require('./cloudinary');
const {SIZE_IMG_LIMIT} = process.env;
const filesize = Number(SIZE_IMG_LIMIT);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(global.__basepath, 'assets', 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, Date.now() + '_ZWALET.' + ext);
//   }
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    folder: 'arttos_cloudinary_folder',
    format: async (req, file) => 'png',
    public_id: (req, file) => new Date().getTime()
  }
});

const upload = multer({
  
  storage,
  limits: {
    fileSize : filesize * 1000 * 1000
  },
  fileFilter: (req, file, cb)=>{
    const extAllow = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp' ];
    if(extAllow.includes(file.mimetype)){
      cb(null, true); 
    }else{
      const err = new Error('Extention Image must be JPG, PNG, WEBP ');
      cb(err, false);
    }
  }
});

module.exports = upload;