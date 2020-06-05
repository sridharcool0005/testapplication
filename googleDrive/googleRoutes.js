var express = require('express');
var router = express.Router();

const googleApiService=require('./googleApi');

router.get('/getAuthURL', (req, res) => {
  googleApiService.generateAuthUrl(req, res);
});


router.post('/setToken',(req,res)=>{
  googleApiService.setToken(req,res);
})


router.get('/pushtogoogledrive',(req,res)=>{
  googleApiService.uploadFile(req,res);
})

module.exports=router;
