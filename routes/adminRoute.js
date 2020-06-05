const express = require('express');
const adminrouter = express.Router();
const doAdmin= require('../services/resgisterService');




adminrouter.post('/adminCreate',(req, res) => {
    doAdmin.adminCreate(req, res);

});

adminrouter.get('/do', (req, res) => {
  doAdmin.getalldoDetails(req, res);
});

module.exports=adminrouter;
