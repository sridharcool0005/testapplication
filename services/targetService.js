const TargetModel = require('../models/target.model');
const AgentModel = require('../models/agent.model');
const DoModel = require("../models/user");
const upsertMany = require('@meanie/mongoose-upsert-many');
const ObjectId = require('mongodb').ObjectID;

module.exports.setTargets = async (req, res) => {
  const { doId, agentId, no_SP, finYear, amtSP, no_NSP, amtNSP } = req.body;

  const Target = new TargetModel({
    no_SP: no_SP,
    amtSP: amtSP,
    no_NSP: no_NSP,
    amtNSP: amtNSP,
    finYear: finYear,
    agentId: agentId,
    doId: doId

  });

  return await Target.save()
    .then((result) => {
      res.send({ success: true, message: 'Target set success' });
    })
    .catch((err) => {
      console.log('err in setting targets', err);
      res.status(400).send({ success: false, message: err.message })
    });
};



//******Don't Remove*** */

// module.exports.getAgentsTargetDetails = async (req, res) => {
//   var doId = req.params.doId;
//   console.log(doId);
//   var query = { doId: doId };

//   AgentModel.find(query, { name: 1, agentId: 1, city: 1 })
//     .then(agents => {
//       var agentIds = [];
//       agents.forEach((agent) => {
//         agentIds.push(agent.agentId);
//       });
//       return TargetModel.find({ agentId: { $in: agentIds } }, { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1 })
//         .then(targets => {
//           agents['name'].push(targets);
//           console.log(agents);
//           res.send({ agents: agents });

//         });
//     })
// }

module.exports.getAgentsTargetDetails = function (req, res) {
  var doId = req.params.doId;
  console.log(doId);
  var query = { doId: doId };

  AgentModel.aggregate([
    {
      $lookup: {
        from: "targets",
        localField: "agentId",
        foreignField: "agentId",
        as: "targets"
      }
    },
    { $match : { doId : doId } }
    // { $project: { _id: 0, amount: 1, rfid: '$_id' } },
  ]).then((result) => {
    console.log(result);
    // res.send("SUCCESS");
    res.send(result);
  });

}

module.exports.trackEditRequest = (req, res) => {

  var {  _id, no_SP, amtSP, no_NSP, amtNSP} = req.body;
  var query = { _id: ObjectId( _id) };
  console.log(query)
  const newvalues = { $set: {no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP} };
  TargetModel.findOneAndUpdate(query, newvalues, {new: true})
    .then(agent => {
      console.log(agent);
        res.send({ agent: agent, message: "success" });
      })
      .catch((err) => {
        console.log('err in statement', err);
        res.status(400).send({ success: false, message: err.message })
      });

}


module.exports.updateAgentTargetDetails = async (req, res) => {
  var agentId = req.params.agentId;
  var doId = req.params.id;
  var no_SP = req.body.no_SP;
  var amtSP = req.body.amtSP;
  var no_NSP = req.body.no_NSP;
  var amtNSP = req.body.amtNSP;
  console.log(agentId, doId, no_SP, amtNSP, no_NSP, amtNSP);

  await TargetModel.updateOne({ agentId: agentId, doId: doId }, { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP })
    .then((result) => {
      console.log(result);
      res.send("SUCCESS");
    });
};
// module.exports.updateInsertAgentTargetDetails = async (req, res) => {
//   var agentId = req.body.agentId;
//   var doId = req.params.id;
//   var no_SP = req.body.no_SP;
//   var amtSP = req.body.amtSP;
//   var no_NSP = req.body.no_NSP;
//   var amtNSP = req.body.amtNSP;
//   var dropDownData = req.body.dropDownData;
//   if(agentId == "all"){
//     var agentIds = [];
//     dropDownData.forEach((agent) => {
//         agentIds.push(agent.agentId);

//       });
//       agentId = agentIds;
//     console.log(agentIds);
//   }
//   console.log(agentId, doId, no_SP, amtNSP, no_NSP, amtNSP);


//   await TargetModel.update({ agentId:  { $in: agentId }, doId: doId }, { $set: { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP }}, {upsert: true, setDefaultsOnInsert: true, multi: true} )
//     .then((result) => {
//       console.log(result);
//       res.send({message : "Success"});
//     });

// };


var fetchCumulativeTargets = function (req, res) {
  //console.log("Targets...." + req.body.doId);
  var doId = req.params.doId
  //  var year=req.params.finYear
  TargetModel.find({ doId: doId }, (error, targets) => {
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
module.exports.getAgentTargetsService = async (req, res) => {
  const {  agentId } = req.body;
  var doId = req.params.doId;
  var year = req.body.year;
  var query = { doId: doId, agentId:agentId ,finYear :year};
  await TargetModel.find(query ,  { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1 }, (error, targets) => {
    if (error){
      return error;

    }else {

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

    // console.log(targets);
    // res.send({targets, message : "Success"});
    }
  });

  console.log('get agent targets');

};

var updateInsertAgentTargetDetails = function(req, res) {
  var agentId = req.body.agentId;
  var doId = req.params.id;
  var no_SP = req.body.no_SP;
  var amtSP = req.body.amtSP;
  var no_NSP = req.body.no_NSP;
  var amtNSP = req.body.amtNSP;
  var dropDownData = req.body.dropDownData;
  var year = 0; // set current yr
  var finYear = req.body.finYear;

  return DoModel.findOne({doId : doId})
  .then(doResult => {
    var currentFinYear = doResult.currentFinYear;
    year = Number(currentFinYear.split("-")[1]);

    var query = {}, update = { finYear: finYear, no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP };
    var queryArr = [];
    if(agentId == "all"){
      dropDownData.forEach((agent) => {
        query = {};
        query.agentId = agent.agentId;
        query.doId = doId;
        queryArr.push(query);
      });
    } else {
      query.agentId = agentId;
      query.doId = doId;
      queryArr.push(query);
    }

    var updateArrP = [];
    queryArr.forEach(query => {
      var updateP = TargetModel.update(query, { $set: update}, {upsert: true, setDefaultsOnInsert: true, multi: true});

      updateArrP.push(updateP);
    });

    return Promise.all(updateArrP)
    .then(()=>{
      res.send({message : "Success"});
    }).catch(err => {
      res.status(500).send({message : "Failed", error: err});
    });

  });

  // if(agentId == "all"){
  //   var agentIds = [];
  //   dropDownData.forEach((agent) => {
  //       //agentIds.push(agent.agentId);
  //       TargetModel.update({ agentId: agent.agentId, doId: doId, finYear :year}, { $set: { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP }}, {upsert: true, setDefaultsOnInsert: true, multi: true})
  //       .then((result) => {
  //         res.send({message : "Success"});
  //       });

  //     });
  //     //agentId = agentIds;
  // } else {
  //       TargetModel.update({ agentId:  agentId , doId: doId, finYear :year }, { $set: { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP }}, {upsert: true, setDefaultsOnInsert: true, multi: true} )
  //       .then((result) => {
  //         console.log(result);
  //         res.send({message : "Success"});
  //       });
  // }

}


var getAgentTarget = function (req, res) {
  console.log("get  agentsTarget service....");
  const agentId = req.params.agentId;


  TargetModel.find({agentId:agentId}, { __v: 0 })
    .then(agents => {
      res.status(200).send(agents);
    });
};

module.exports.getAgentTarget=getAgentTarget;
module.exports.updateInsertAgentTargetDetails = updateInsertAgentTargetDetails;
module.exports.fetchCumulativeTargets = fetchCumulativeTargets;
