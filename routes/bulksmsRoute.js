var express = require('express');
var router = express.Router();
const bulkSMSService= require ('../services/bulkSMSService');

router.get('/do/:doId/getsmsPack', (req, res) => {
  bulkSMSService.callApi(req, res);

});

router.post('/do/:doId/sendSMS',(req,res)=>{
  bulkSMSService.sendSMS(req,res);
})

router.post('/getsmspackDetails',(req,res)=>{
  bulkSMSService.getsmspackDetails(req,res);
})

router.get('/checkBalance', (req, res) => {
  bulkSMSService.checkBalance(req, res);

});

router.post('/addNewClient', (req, res) => {
  bulkSMSService.addNewClient(req, res);

});

router.post('/getSMSCreditHistory', (req, res) => {
  bulkSMSService.getSMSCreditHistory(req, res);

});


router.post('/do/:doId/getTransactionHistory',(req,res)=>{
  bulkSMSService.getTransactionHistory(req,res);
})


router.get('/do/:doId/getActivePack',(req,res)=>{
  bulkSMSService.getActivePack(req,res);
})

router.get('/do/:doId/getOfflinepayment',(req,res)=>{
  bulkSMSService.getOfflinepayment(req,res);
})

router.put('/do/:doId/getOrderId',(req,res)=>{
  bulkSMSService.getOrderId(req,res);
})

router.post('/do/:doId/postPaymentTransaction',(req,res)=>{
  bulkSMSService.postPaymentTransaction(req,res);
})

router.post('/do/:doId/getDlrSummary',(req,res)=>{
  bulkSMSService.DlrSummary(req,res);
})

router.post('/do/:doId/DlrDetailed',(req,res)=>{
  bulkSMSService.DlrDetailed(req,res);
})


router.post('/do/:doId/getPieChartApidata',(req,res)=>{
  bulkSMSService.getPieChartApidata(req,res);
})


router.post('/do/:doId/GetCouponAmt',(req,res)=>{
  bulkSMSService.GetCouponAmt(req,res);
})

router.get('/do/:doId/NotificationsCount',(req,res)=>{
  bulkSMSService.NotificationsCount(req,res);
})

router.get('/do/:doId/NotificationsDetails',(req,res)=>{
  bulkSMSService.NotificationsDetails(req,res);
})

router.get('/do/:doId/getGatewaydataAPI',(req,res)=>{
  bulkSMSService.getGatewaydataAPI(req,res);
})


module.exports = router;
