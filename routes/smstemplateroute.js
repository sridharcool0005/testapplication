var express = require('express');
var router = express.Router();

const smstemplateservice = require('../services/smstemplateservice');


router.post('/do/:doId/createsmsfolder', (req, res) => {
  smstemplateservice.createFolder(req, res);
});

router.get('/do/:doId/getsmsfolders', (req, res) => {
  smstemplateservice.getfolders(req, res);
})

router.post('/do/:doId/addTemplate', (req, res) => {
  smstemplateservice.addTemplate(req, res);
})


router.post('/do/:doId/getTemplate', (req, res) => {
  smstemplateservice.getfiles(req, res);
})

module.exports = router;
