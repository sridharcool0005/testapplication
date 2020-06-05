const sendEmail = require('../routes/mailer');
const CONST = require('../constants/constants.js');
const Templates = require('../views//emailTemplates.js');
const fs = require('fs')
const request = require('request');
var http = require("https");
const User = require('../models/user');
const greetingFolder=require('../models/greetingModel');
fetchSystemTemplatesTypesAPI ='https://www.nutansms.nutantek.com/clients/fetchSystemTemplatesTypes.php';
fetchSystemtemplateAll=  'https://www.nutansms.nutantek.com/clients/fetchSystemtemplateAll.php';


module.exports.sendGreetingsService = function (req, res) {
    var options = {};
    options.occassion = req.body.occassion;
    options.message = req.body.message;
    //mailAttachmentList = [{ path: ABSPATH + '/images/test.jpg'}]

    options.attachments= req.body.mailAttachmentList
    // options.attachments= [{
    //   filename:"fun.jpg",
    //   path: '../src/assets/templates/4.PNG',
    //   cid:"uniqueID@creata.ee"

    // }]
    //options.agentName = "Suresh";
    options.doName = "Suresh";
    options.to = req.body.emailsArr;
    options.cc = [];
    sendEmail(options, CONST.SEND_GREETING).then(result => {
      res.status(200).send({result,message:"greetings send success"});
    })
    .catch(err => {
    console.log(err);
    });

  };

module.exports.previewGreetingsService = function (req, res) {
    var options = {};
    options.occassion = req.body.occassion;
    options.message = req.body.message;
    options.attachments= req.body.mailAttachmentList

    let Template = Templates(CONST.SEND_GREETING, options);
    res.send(Template.body);
    console.log("templateType=", templateType);
    console.log("email body=", Template.body);  // remove after development
}

const AgentModel = require('../models/agent.model');

var fetchOccassions = function (req, res) {
  console.log("get do service....");
  // var query = {};
  var doId = req.params.doId;
  var CurDate = new Date().toISOString().slice(0,10);
  console.log(CurDate);
  var DOB = CurDate;
  if (CurDate===DOB ){
  AgentModel.find({ doId: doId,DOB:DOB},{DOB:[1],name:[1],mobile:[1],profilePic:[1]} )
  .then(agent => {
    res.status(200).send(agent);
  });
}
  else
 {

 }
};



module.exports.fetchSystemTemplatesTypes = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const options = {
    url: fetchSystemTemplatesTypesAPI,
    qs: {client_id:doId},

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
console.log(options)
  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
   });
}



module.exports.fetchSystemtemplateAll = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { event_code } = req.body;
  const options = {
    url: fetchSystemtemplateAll,
    qs: {client_id:doId,event_code:event_code},

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
console.log(options)
  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
});
}



module.exports.createFolderbyDo = async (req, res) => {
  const doId = req.params.doId;
  const {folderName} = req.body;
    const folder = new greetingFolder({
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




module.exports.getfolders = function (req, res) {
  const doId = req.params.doId;
  greetingFolder.find({doId: doId}, { folderName:1})
    .then(result => {
      res.status(200).send(result);
    });
};












module.exports.fetchOccassions=fetchOccassions;
