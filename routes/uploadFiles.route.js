let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  fileUploadRoute = express.Router();

// Multer File upload settings
const DIR = './public/';

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
let fileModel=require('../models/filesModel');


// POST User
fileUploadRoute.post('/do/:doId/fileUpload', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new fileModel({
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
  file.save().then(result => {
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


fileUploadRoute.get("/do/:doId/materials", (req, res, next) => {
  const doId=req.params.doId;
  var query = {  Category:'Newly Launched Plan ',doId:doId};
  console.log("get all notice service....");
  fileModel.find(query, { __v: 0 })
    .then(materials => {
      res.status(200).send(materials);
    });
});

fileUploadRoute.get("/do/:doId/learning", (req, res, next) => {
  var query = {  Category:'General Learning'};
  console.log("get all notice service....");
  fileModel.find(query, { __v: 0 })
    .then(materials => {
      res.status(200).send(materials);
    });
});


fileUploadRoute.get("/do/:doId/competitorsinfo", (req, res, next) => {
  var query = {  Category:'Competitors Info'};
  console.log("get all notice service....");
  fileModel.find(query, { __v: 0 })
    .then(materials => {
      res.status(200).send(materials);
    });
});



fileUploadRoute.post('/do/:doId/template', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new fileModel({
    _id: new mongoose.Types.ObjectId(),
    doId:req.params.doId,
    description:req.body.description,
    Category:req.body.Category,
    avatar: url+'/public/' + req.file.filename
  });
  file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "template uploaded successfully!",
      userCreated: {
        _id: result._id,
        avatar: result.avatar,
        description:result. description,
        Category:result. Category,
        doId:result.doId
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})




fileUploadRoute.post("/do/:doId/getTemplates", (req, res) => {
const doId=req.params.doId;
const {folderName} = req.body;
  var query = {doId:doId, folderName:folderName};
  console.log(query)
  fileModel.find(query, { __v: 0 })
    .then(materials => {
      res.status(200).send(materials);
    }).catch(err => {
      console.log(err),
        res.status(400).json({
          error: err
        });
    })
});

module.exports = fileUploadRoute;
