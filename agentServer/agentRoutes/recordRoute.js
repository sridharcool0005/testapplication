const express = require('express');
const recordSaleRoute = express.Router();
const recordService = require('../agentServices/recordSale');


recordSaleRoute.post('/do/:doId/agent/:agentId/recordsale', (req, res) => {
  recordService.recordSale(req, res);
});
recordSaleRoute.get('/agent/:agentId/do/:doId/getRecordSales', (req, res) => {
  recordService.fetchRecordsales(req, res);
})


module.exports=recordSaleRoute
