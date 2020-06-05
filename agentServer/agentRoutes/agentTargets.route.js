const express = require('express');
const router = express.Router();
const agentTargetService = require('../agentServices/agentTargetService');


router.get('/agent/:agentId/do/:doId/targets', (req, res) => {
    agentTargetService.fetchAgentTargets(req, res);
  });

router.put('/agent/:agentId/do/:doId/targets', (req, res) => {
  agentTargetService.updateAgentTargets(req, res);
})


  module.exports = router;