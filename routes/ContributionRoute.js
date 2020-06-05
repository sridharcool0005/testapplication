const contributionService=require('../services/contributionService');
const personalRepos =require('../services/personalRepositoryService');


let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  contribution = express.Router();

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

});

let contributionModel=require('../models/filesModel');


contribution.post('/do/:doId/agent/:agentId/agentcontribution', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new contributionModel({
    _id: new mongoose.Types.ObjectId(),
    agentId:req.params.agentId,
    doId:req.params.doId,
    name: req.body.name,
    Source:req.body.Source,
    date:req.body.date,
    description:req.body.description,
    title:req.body.title,
    Category:req.body.Category,
    status: 'NEW',
    avatar: url+'/public/' + req.file.filename
  });
  file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        doId:result.doId,
        agentId:result.agentId,
        name: result.name,
        avatar: result.avatar,
        title: result.title,
        Source: result.Source,
        date:result.date,
        Category:result.Category,
        description:result. description


      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

contribution.put('/do/:doId/approve', (req, res) => {
  contributionService.approveContribution(req, res);
});

contribution.put('/do/:doId/deny', (req, res) => {
  contributionService.denyContribution(req, res);
});

contribution.get('/do/:doId/contribution', (req, res) => {
  contributionService.getAllcontributionService(req, res);
});

// contribution.get('/do/:doId/getcontribution', (req, res) => {
//   contributionService.getContribution(req, res);
// });
contribution.get('/do/:doId/getplans',(req,res)=>{
  contributionService.getPlans(req,res);
});

contribution.get('/do/:doId/getGeneralLearning',(req,res)=>{
  contributionService.getGeneralLearning(req,res);
});

contribution.get('/do/:doId/getCompetitorsInfo',(req,res)=>{
  contributionService.getCompetitorsInfo(req,res);
});

const personalModel= require ('../models/personalRepositoryModel');

contribution.post('/agent/:agentId/personalrepository', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new personalModel({
    _id: new mongoose.Types.ObjectId(),
    agentId:req.params.agentId,
    name: req.body.name,
    description:req.body.description,
    title:req.body.title,
    Category:req.body.Category,
    avatar: url+'/public/' + req.file.filename
  });
  file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        agentId:result.agentId,
        name: result.name,
        avatar: result.avatar,
        title: result.title,
        Category:result.Category,
        description:result. description


      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})



contribution.get('/agent/:agentId/LicPlansPresentation',(req,res)=>{
  personalRepos.LicPlansPresentation(req,res);
});

contribution.get('/agent/:agentId/getReferenceMaterials',(req,res)=>{
  personalRepos.getReferenceMaterials(req,res);
});
contribution.get('/agent/:agentId/GeneralLearning',(req,res)=>{
  personalRepos.GeneralLearning(req,res);
});

////////////////// *********do personal repository routes**********//////////////////////


contribution.post('/do/:doId/UploadPersonalRepository', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new personalModel({
    _id: new mongoose.Types.ObjectId(),
    doId:req.params.doId,
    name: req.body.name,
    description:req.body.description,
    title:req.body.title,
    Category:req.body.Category,
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
        Category:result.Category,
        description:result. description


      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})



contribution.get('/do/:doId/getDoreferenceMaterials',(req,res)=>{
  personalRepos.getDoreferenceMaterials(req,res);
});

contribution.get('/do/:doId/getDoSelfLearning',(req,res)=>{
  personalRepos.getDoSelfLearning(req,res);
});

contribution.get('/do/:doId/getDoLicPlans',(req,res)=>{
  personalRepos.getDoLicPlans(req,res);
});


module.exports = contribution;
