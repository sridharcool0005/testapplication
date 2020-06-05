const express = require('express');
const router = express.Router();
const recordSaleService = require('../services/recordSales.service')

router.get('/do/:doId/getRecordSales', (req, res) => {
  recordSaleService.fetchDoRecordsales(req, res);
});
router.post('/do/:doId/agent/agentRecordSales', (req, res) => {
  recordSaleService.fetchAgentRecordsales(req, res);
});
router.post('/do/:doId/agent/singleAgentRecordsales', (req, res) => {
  recordSaleService.agentSingleRecordsales(req, res);
});
router.get('/do/:doId/year/:year/agent/allAgentRecordsales', (req, res) => {
  recordSaleService.agentAllRecordsales(req, res);
});

router.put('/recordsales/update',(req,res)=>{
  recordSaleService.updateRecordSales(req,res);
})

router.post('/do/:doId/finYear/:finYear/recordsale', (req, res) => {
  recordSaleService.UploadTargets(req, res);
});


router.get('/do/:doId/finYear/:finYear/getAgentRecords',(req,res)=>{
recordSaleService.getAgentRecords(req,res);
})
module.exports = router;
