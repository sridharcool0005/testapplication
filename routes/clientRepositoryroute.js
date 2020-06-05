const clientRepoService =require ('../services/clientRepoService');


let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  clientRepoRouter = express.Router();

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

let clientsRepositoryModel=require('../models/clientsRepositoryModel');


clientRepoRouter.post('/agent/:agentId/clientRepository', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')

  const file = new clientsRepositoryModel({
    _id: new mongoose.Types.ObjectId(),
    agentId:req.params.agentId,
    fullName: req.body.fullName,
    id:req.body.id,
    whatsaap:req.body.whatsaap,
    folderName:req.body.folderName,
    email: req.body.email,
    avatar: url+'/public/' + req.file.filename
  });
  file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        agentId:result.agentId,
        fullName: result.fullName,
        avatar: result.avatar,
        id: result.id,
        whatsaap:result.whatsaap,
        email:result.email,
        folderName:result.folderName
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
});

clientRepoRouter.get('/agent/:agentId/getClientRepos',(req,res)=>{
  clientRepoService.getClientRepos(req,res);
});

clientRepoRouter.post('/agent/:agentId/folderCreate',(req,res)=>{
  clientRepoService.createFolder(req,res);
});

clientRepoRouter.post('/do/:doId/folderCreatebyDo',(req,res)=>{
  clientRepoService.createFolderbyDo(req,res);
});


clientRepoRouter.get('/agent/:agentId/getfolders',(req,res)=>{
  clientRepoService.getfolders(req,res);
});

clientRepoRouter.get('/do/:doId/getfoldersofDo',(req,res)=>{
  clientRepoService.getfoldersofDo(req,res);
});

clientRepoRouter.post('/agent/:agentId/getfiles',(req,res)=>{
  clientRepoService.getfiles(req,res);
});


clientRepoRouter.get('/agent/:agentId/getclientsList',(req,res)=>{
  clientRepoService.getclientsList(req,res);
});



// *****do model***///////
let clientDocsModel=require('../models/clientDocsModel');

clientRepoRouter.post('/do/:doId/CreateDoclientRepository', upload.single('avatar'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')

  const file = new clientDocsModel({
    _id: new mongoose.Types.ObjectId(),
    doId:req.params.doId,
    notes:req.body.notes,
    folderName:req.body.folderName,
    avatar: url+'/public/' + req.file.filename
  });
  file.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "User registered successfully!",
      userCreated: {
        _id: result._id,
        doId:result.doId,
        avatar: result.avatar,
        notes:result.notes,
        folderName:result.folderName
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
});


clientRepoRouter.post('/do/:doId/getDoClientsData',(req,res)=>{
  clientRepoService.getDoClientsData(req,res);
});


clientRepoRouter.get('/do/:doId/getDoClientsList',(req,res)=>{
  clientRepoService.getDoClientsList(req,res);
});

clientRepoRouter.post('/do/:doId/searchClients',(req,res)=>{
  clientRepoService.searchClients(req,res);
});

clientRepoRouter.post('/do/:doId/searchpolicyDocs',(req,res)=>{
  clientRepoService.searchpolicyDocs(req,res);
});

clientRepoRouter.post('/do/:doId/addcustomersfromAutosms',(req,res)=>{
  clientRepoService.addcustomersfromAutosms(req,res);
});

clientRepoRouter.post('/do/:doId/createfoldersforCustomers',(req,res)=>{
  clientRepoService.createfoldersforCustomers(req,res);
});


clientRepoRouter.post('/do/:doId/addNewClient',(req,res)=>{
  clientRepoService.addNewClient(req,res);
});

clientRepoRouter.get('/do/:doId/getMyContacts',(req,res)=>{
  clientRepoService.getMyContacts(req,res);
});

clientRepoRouter.get('/do/:doId/getMyTeamContacts',(req,res)=>{
  clientRepoService.getMyTeam(req,res);
});


module.exports = clientRepoRouter;
