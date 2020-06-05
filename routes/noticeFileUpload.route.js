let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  router = express.Router();

// Multer File upload settings
const DIR = './public/';
const fs = require("fs")



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'applcation/pdf') {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  //   }
  // }
});


// User model
let Notice = require('../models/noticeFileUpload.model');


// POST User
router.post('/do/:doId/noticeUpload', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const user = new Notice({
    _id: new mongoose.Types.ObjectId(),
    doId:req.params.doId,
    name: req.body.name,
    Source:req.body.Source,
    date:req.body.date,
    description:req.body.description,
    Category:req.body.Category,
    title:req.body.title,
    avatar: url+'/public/' + req.file.filename
  });
  user.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        doId:result.doId,
        name: result.name,
        avatar: result.avatar,
        title: result.title,
        Source: result.Source,
        date:result.date,
        description:result. description,
        Category:result. Category,

      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

// GET All Users
router.get("/do/:doId/files", (req, res, next) => {
  const doId = req.params.doId;
  console.log("get all notice service....");
  Notice.find({doId:doId}, { __v: 0 })
    .then(PdfFiles => {
      res.status(200).send(PdfFiles);
    });
});


module.exports = router;
