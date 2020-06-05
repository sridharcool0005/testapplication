var express = require('express');
var router = express.Router();
const CallMangeRouter = require('../services/calManagementService');


router.post('/do/:doId/xlfileUpload', (req, res) => {
  CallMangeRouter.callManangeService(req, res);
});

router.post('/do/:doId/callData', (req, res) => {
  CallMangeRouter.getCallData(req, res);
});

router.post('/do/:doId/UserDetails', (req, res) => {
  CallMangeRouter.getUserDetails(req, res);
});

router.put('/do/:doId/callDataUpdate', (req, res) => {
  CallMangeRouter.updateCallData(req, res);
});

router.post('/do/:doId/deleteUser', (req, res) => {
  CallMangeRouter.deleteCallData(req, res);
});



router.post('/do/:doId/createCallManageFolder', (req, res) => {
  CallMangeRouter.createFolderbyDo(req, res);
});

router.post('/do/:doId/createDefaultFolder', (req, res) => {
  CallMangeRouter.createDefaultFolder(req, res);
});



router.get('/do/:doId/getCalDataFolders', (req, res) => {
  CallMangeRouter.getCalDataFolders(req, res);
});


router.post('/do/:doId/getbyDate', (req, res) => {
  CallMangeRouter.getbyDate(req, res);
});

router.get('/getByperviousDate', (req, res) => {
  CallMangeRouter.getByperviousDate(req, res);
});


router.post('/do/:doId/insertEvents', (req, res) => {
  CallMangeRouter.InsertEvents(req, res);
});


router.get('/do/:doId/counDouments', (req, res) => {
  CallMangeRouter.counDouments(req, res);
});

router.get('/do/:doId/targetCount', (req, res) => {
  CallMangeRouter.targetCount(req, res);
});

router.post('/do/:doId/getbyfilter', (req, res) => {
  CallMangeRouter.getbyfilter(req, res);
});


router.post('/do/:doId/addNewContact', (req, res) => {
  CallMangeRouter.addNewContact(req, res);
});


router.post('/do/:doId/getbulkdata', (req, res) => {
  CallMangeRouter.getbulkdata(req, res);
});


router.post('/do/:doId/prospectcustomerUpload', (req, res) => {
  CallMangeRouter.prospectcustomerUpload(req, res);
});


module.exports = router;
