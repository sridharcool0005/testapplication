var express = require('express');
var router = express.Router();
const patymService =require ('../services/patymService');


router.get('/paywithPayment', (req, res) => {
  console.log(req,res)
  patymService.patymPayment(req, res);

});

module.exports = router;
