var express = require('express');
var router = express.Router();
const routeHandlerAgent = require('../services/agentService');


router.get('/agent/:agentId/details', (req, res) => {
  routeHandlerAgent.getAgentService(req, res);
});

router.get('/do/:id/agent/search/:q',(req,res)=>{
  console.log("inside router");
    routeHandlerAgent.searchAgents(req,res);
});

router.get('/do/:doId/agents', (req, res) => {
    routeHandlerAgent.getAllAgentService(req, res);
});
router.get('/do/:doId/approved/agents', (req, res) => {
  routeHandlerAgent.getApprovedAgentService(req, res);
});
router.post('/do/:doId/agent/invite', (req, res) => {
    routeHandlerAgent.inviteAgentService(req, res);
});



router.put('/agent/approve', (req, res) => {
    routeHandlerAgent.approveAgentService(req, res);
});

router.put('/agent/deny', (req, res) => {
    routeHandlerAgent.denyAgentService(req, res);
});


router.post('/register', (req,res)=>{
  routeHandlerAgent.create(req,res);
});


router.put('/edit/:agentId/editprofile', (req, res) => {
  routeHandlerAgent.updateAgentDetails(req, res);
});

router.put('/do/:doId/agent/editcategory', (req, res) => {
  routeHandlerAgent.updateAgentview(req, res);
});

router.put('/agents/details', (req, res) => {
  routeHandlerAgent.getAgentDetails(req, res);
});
router.get('/do/:doId/dropDown/agents', (req, res) => {
  routeHandlerAgent.getDropDownAgentService(req, res);
});

router.post('/registrationEmail',(req,res)=>{
  routeHandlerAgent.registrationEmail(req,res);
})

router.post('/do/:doId/getbyagentId',(req,res)=>{
  routeHandlerAgent.getbyagentId(req,res);
})

router.get('/do/:doId/counAgents',(req,res)=>{
  routeHandlerAgent.counAgents(req,res);
})

router.get('/do/:doId/counOfNewAgents',(req,res)=>{
  routeHandlerAgent.counOfNewAgents(req,res);
})

router.post('/postofficeApi',(req,res)=>{
  routeHandlerAgent.postofficeApi(req,res);
})


module.exports = router;
