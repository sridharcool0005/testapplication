const filesModel=require('../models/filesModel');


var fileService = function (req, res) {
  console.log("get all files service....");
  var query = {};


  filesModel.find(query, { __v: 0 })
    .then(files => {
      res.status(200).send(files);
    });
};

  module.exports.fileService=fileService;
