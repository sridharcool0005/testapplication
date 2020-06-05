const folderModel= require('../models/smsModel');
const templateModel = require('../models/templateModel')


module.exports.createFolder = async (req, res) => {
  const doId = req.params.doId;
  const {folderName} = req.body;
    const folder = new folderModel({
      doId: doId,
      folderName:folderName,

    });
  return await   folder.save().then(result => {
    res.send({ success: true, message: 'Folder created sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  });

};



module.exports.addTemplate = async (req, res) => {
  const doId = req.params.doId;
  const {folderName,template} = req.body;

    const folder = new templateModel({
      doId: doId,
      folderName:folderName,
      template:template

    });
  return await   folder.save().then(result => {
    res.send({ success: true, message: 'Template added sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in smsTemplateservice', err);
    res.status(400).send({ success: false, message: err.message })
  });

};



module.exports.getfolders = function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  folderModel.find({doId: doId}, { folderName:1})
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getfiles = function (req, res) {
  const doId = req.params.doId;
  const {folderName}=req.body;
  templateModel.find({doId: doId,folderName:folderName}, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};
