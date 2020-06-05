const contributionModel = require('../models/filesModel');


var getAllcontributionService = function (req, res) {
  console.log("get all agents service....");
  var query = {};
  const doId = req.params.doId;
  if (req.query.status == 'new') {
    query.status = 'NEW'
  }
  contributionModel.find({status : 'NEW', doId:doId}, { __v: 0 })
    .then(contributions => {
      res.status(200).send(contributions);
    });
};

var approveContribution = function (req, res) {
  const doId = req.params.doId;
console.log(doId);
contributionModel.updateOne({doId:doId}, { status: 'APPROVE'})
    .then((result) => {

      res.send({result, message:"SUCCESS"});
    });
};

var denyContribution = function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  contributionModel.updateOne({doId: doId}, {status: 'DENY' })
    .then(result => {
      res.send({result, message:"SUCCESS"});
    });
};

var getPlans = function (req, res) {
  var query = {};
  const doId = req.params.doId;
  if (req.query.status == 'APPROVE') {
    query.status = 'APPROVE'
  }

  console.log(doId);
  contributionModel.find({doId: doId, status: 'APPROVE',Category:'Newly Launched Plan ' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

var getGeneralLearning = function (req, res) {
  var query = {};
  const doId = req.params.doId;
  if (req.query.status == 'APPROVE') {
    query.status = 'APPROVE'
  }

  console.log(doId);
  contributionModel.find({doId: doId, status: 'APPROVE',Category:'General Learning' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};
var getCompetitorsInfo= function (req, res) {
  var query = {};
  const doId = req.params.doId;
  if (req.query.status == 'APPROVE') {
    query.status = 'APPROVE'
  }

  console.log(doId);
  contributionModel.find({doId: doId, status: 'APPROVE',Category:'Competitors Info' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};



module.exports.approveContribution = approveContribution;
module.exports.denyContribution = denyContribution;
module.exports.getAllcontributionService=getAllcontributionService;
module.exports.getPlans=getPlans;
module.exports.getGeneralLearning=getGeneralLearning;
module.exports.getCompetitorsInfo=getCompetitorsInfo;

