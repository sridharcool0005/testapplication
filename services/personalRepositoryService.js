
const personalModel= require ('../models/personalRepositoryModel');

module.exports.LicPlansPresentation=function (req, res) {

  const agentId = req.params.agentId;
  console.log(agentId);
  personalModel.find({agentId: agentId,Category:'Lic Plans Presentation' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getDoLicPlans=function (req, res) {

  const doId = req.params.doId;
  console.log(doId);
  personalModel.find({doId: doId,Category:'Lic Plans Presentation' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getReferenceMaterials=function (req, res) {

  const agentId = req.params.agentId;


  console.log(agentId);
  personalModel.find({agentId: agentId,Category:'Reference Materials' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getDoreferenceMaterials=function (req, res) {

  const doId = req.params.doId;


  console.log(doId);
  personalModel.find({doId: doId,Category:'Reference Materials' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};
module.exports.GeneralLearning=function (req, res) {

  const agentId = req.params.agentId;


  console.log(agentId);
  personalModel.find({agentId: agentId,Category:'General Learning' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getDoSelfLearning=function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  personalModel.find({doId: doId,Category:'Self Learning' },{ __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};
