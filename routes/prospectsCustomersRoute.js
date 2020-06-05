var express = require('express');
var router = express.Router();

const autosmsService= require ('../services/autosmsService');

router.post('/fetchProspectsCustomersdata', (req, res) => {
  autosmsService.fetchProspectsCustomersdata(req, res);

});
router.post('/fetchCustomersdata', (req, res) => {
  autosmsService.fetchCustomersdata(req, res);

});

router.post('/addProspectsCustomersdata', (req, res) => {
  autosmsService.addProspectsCustomersdata(req, res);

});

router.post('/fetchprospectcustomerbyId', (req, res) => {
  autosmsService.fetchprospectcustomerbyId(req, res);
});
router.post('/editProspectsCustomersdata', (req, res) => {
  autosmsService.editProspectsCustomersdata(req, res);
});
router.post('/do/:doId/ImportXlApi', (req, res) => {
  autosmsService.ImportXlApi(req, res);
});

router.get('/fetchAuthKey', (req, res) => {
  autosmsService.fetchAuthKeyData(req, res);
});

router.get('/logfiledownload', (req, res) => {
  autosmsService.logfiledownload(req, res);
});
router.post('/do/:doId/prospectsSearch', (req, res) => {
  autosmsService.SearchData(req, res);
});

router.post('/do/:doId/customerSearchApi', (req, res) => {
  autosmsService.customerSearchApi(req, res);
});

router.post('/getprospectsCustomers', (req, res) => {
  autosmsService.getprospectsCustomers(req, res);
});


module.exports = router;
