const TargetModel = require('../../models/target.model');
// const AgentModel = require('../models/agent.model');
const upsertMany = require('@meanie/mongoose-upsert-many');


var fetchAgentTargets = function (req, res) {
    //console.log("Targets...." + req.body.doId);
    var doId = req.params.doId;
    var agentId = req.params.agentId;
    //  var year=req.params.finYear
    TargetModel.find({ doId: doId, agentId }, (error, targets) => {
      if (error)
        return error;
  
      var no_SPSum = 0;
      var amtSPSum = 0;
      var no_NSPSum = 0;
      var amtNSPSum = 0;
      targets.forEach(target => {
        no_SPSum += target.no_SP;
        no_NSPSum += target.no_NSP;
        amtSPSum += target.amtSP;
        amtNSPSum += target.amtNSP
      });
      var output = {
        no_SPSum: no_SPSum,
        amtSPSum: amtSPSum,
        no_NSPSum: no_NSPSum,
        amtNSPSum: amtNSPSum
      }
      res.json(output);
    })
  
  };

  var updateAgentTargets = function(req, res) {
    var doId = req.params.doId;
    var agentId = req.params.agentId;
    var no_SP = req.body.no_SPSum;
    var amtSP = req.body.amtSPSum;
    var no_NSP = req.body.no_NSPSum;
    var amtNSP = req.body.amtNSPSum;
    console.log(agentId, doId, no_SP, amtNSP, no_NSP, amtNSP);
  
     TargetModel.updateOne({ agentId: agentId, doId: doId }, { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP })
      .then((result) => {
        console.log(result);
        res.send({message:"SUCCESS"});
      });

  }

  module.exports.updateAgentTargets = updateAgentTargets;
  module.exports.fetchAgentTargets = fetchAgentTargets;