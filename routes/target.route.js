const express = require('express');
const router = express.Router();
const targetService = require('../services/targetService');


router.get('/agent/:agentId/targets', (req, res) => {
  targetService.getAgentTarget(req, res);
});

router.get('/do/:doId/target/agents', (req, res) => {
    targetService.getAgentsTargetDetails(req, res);
});

router.put('/do/:id/target/agent/:agentId', (req, res) => {
    targetService.updateAgentTargetDetails(req, res);
});

router.put('/do/:id/agent/target', (req, res) => {
  targetService.updateInsertAgentTargetDetails(req, res);
});


router.get('/do/:doId/targets', (req, res) => {
  targetService.fetchCumulativeTargets(req, res);
});
router.post('/do/:doId/agent/targets', (req, res) => {
  targetService.getAgentTargetsService(req, res);
});

router.put('/target/edit', (req, res) => {
  targetService.trackEditRequest(req, res);
});


module.exports = router;
