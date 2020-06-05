const AgentModel = require('../models/agent.model');
const sendEmailService = require('../routes/inviteAgentsMailer');
const constants = require('../constants/constants.js');
const ObjectId = require('mongodb').ObjectID;
const crypto = require("crypto");
const request = require('request');


var getAllAgentService = function (req, res) {
  console.log("get all agents service....");
  var query = {};
  const doId = req.params.doId;

  // if (req.query.status == 'APPROVE') {
  //   query.status = 'APPROVE'
  // }

  AgentModel.find({ doId: doId }, { __v: 0 })
    .then(agents => {
      res.status(200).send(agents);
    });
};


var getApprovedAgentService = function (req, res) {
  console.log("get all agents service....");
  const doId = req.params.doId;
  // if (req.query.status == 'new') {
  //   query.status = 'NEW'
  // }

  AgentModel.find({ doId: doId }, {agentId:1,city: 1, category: 1, mobile: 1, address1: 1,firstName:1,lastName:1,email:1 })
    .then(agents => {
      res.status(200).send(agents);
    });
};


module.exports.getAgentDetails = (req, res) => {

  var { agentId, city, category, mobile, address1 } = req.body;
  var query = { _id: ObjectId(agentId) };
  console.log(query)
  const newvalues = { $set: { city: city, category: category, mobile: mobile, address1: address1 } };
  AgentModel.findOneAndUpdate(query, newvalues, { new: true })
    .then(agent => {
      console.log(agent);
      res.send({ agent: agent, message: "success" });
    })
    .catch((err) => {
      console.log('err in statement', err);
      res.status(400).send({ success: false, message: err.message })
    });

}


var inviteAgentService = function (req, res) {
  var message = {};
  message.host = req.headers.host;

  //options.agentName = "Suresh";
  message.doName = "J.K.Chaurasia";
  message.doId = req.params.doId;

  var toEmail = req.body.emailsArr;   // "agent@example.com";
  var ccEmail = [];

  sendEmailService.inviteagents(toEmail, ccEmail, message, constants.INVITE_AGENT).then(inviteagents => {
    console.log(inviteagents);
    res.send({ inviteagents: inviteagents, message: "Email sent success " });
  })
    .catch((err) => {
      console.log('Please check email Id', err);
      res.status(400).send({ success: false, message: err.message })
    });
};



module.exports.create = async (req, res) => {
  const id =crypto.randomBytes(6).toString("hex");
  const pwd=crypto.randomBytes(8).toString("hex");

  const { doId, firstName, lastName,email, DOA, DOB, Maritial, gender,
    mobile, whatsapp, address1, address2, pincode, state, profilePic,postoffice,district,role } = req.body;

  const Agent = new AgentModel({
    agentId: id,
    doId: doId,
    firstName: firstName,
    lastName:lastName,
    Maritial: Maritial,
    gender: gender,
    DOB: DOB,
    DOA: DOA,
    email: email,
    password: pwd,
    mobile: mobile,
    whatsapp: whatsapp,
    address1: address1,
    address2: address2,
    state: state,
    pincode: pincode,
    city: district,
    postoffice:postoffice,
    district:district,
    profilePic: profilePic,
    category: 'BEGINNER',
    role:role

  });

  await Agent.save().then((result) => {

    const message = {};
    message.host = req.headers.host;

    //options.agentName = "Suresh";
    message.doName = "Suresh";
    message.userEmail = email;
    message.doId = doId;
    const toEmail = [email];

    sendEmailService.registerUser(toEmail, message, constants.registrationEmail).then(() => {
     res.status(200).send({ success: true, message })
    }).then(()=>{
      const password = {};
      //options.agentName = "Suresh";
      password.doName = "Suresh";
      password.userPassword = pwd;
      console.log(password.userPassword)
      const toEmail = [email];

      sendEmailService.registerUser(toEmail, password, constants.AGENTPASSWORD).then(() => {
       res.status(200).send({ success: true, password })
      })
    })
    .catch((err) => {
        console.log(err)
    })
  })
    .catch((err) => {
      console.log('err in admin controller', err);
      res.status(400).send({ success: false, message: err.message })
    });



};




// var approveAgentService = function (req, res) {
//   var { agentId } = req.body;

// console.log(agentId);
//   AgentModel.update({ agentId: agentId }, { status: 'APPROVE'})
//     .then((result) => {
//       res.send({result, message:"SUCCESS"});
//     });
// };

// var denyAgentService = function (req, res) {
//   var { agentId } = req.body;
//   console.log(agentId);
//   AgentModel.updateOne({ agentId: agentId }, { status: 'DENY' })
//     .then(result => {
//       res.send({result, message:"SUCCESS"});
//     });
// };



var searchAgents = function (req, res) {
  console.log("searchAgents service");
  var searchStr = req.params.q;
  var doId = req.params.id;

  if (!searchStr || searchStr == null)
    return res.status(400).send({ message: "Search string required" });

  var regex = "^" + searchStr + "";
  AgentModel.find({ name: new RegExp(regex, "i"), doId: doId }, { _id: 0, agentId: 1, name: 1 })
    .then(agentsResult => {
      res.status(200).send(agentsResult);
    });
};





module.exports.updateAgentview = async (req, res) => {
  var doId = req.params.doId;
  var agentId = req.params.agentId;
  var mobile = req.body.mobile;
  var address1 = req.body.address1;
  var city = req.body.city;
  var category = req.body.category;
  console.log(agentId, mobile, address1, city, category);

  await AgentModel.updateOne({ agentId: agentId, doId: doId }, { mobile, address1, city, category })
    .then((result) => {
      console.log(result);
      res.send("SUCCESS");
    });
};
module.exports.getDropDownAgentService = async (req, res) => {
  console.log("get dopdown agents service....");
  var query = {};
  const doId = req.params.doId;
  // if (req.query.status == 'new') {
  //   query.status = 'NEW'
  // }

  AgentModel.find({ doId: doId }, { _id: 0, agentId: 1, name: 1 })
    .then(agents => {
      res.status(200).send(agents);
    });
};


var getAgentService = function (req, res) {
  console.log("get do service....");
  // var query = {};
  var agentId = req.params.agentId;
  // if (req.query.status == 'new') {
  //   query.status = 'NEW'
  // }
  AgentModel.find({ agentId: agentId }, { __v: 0})
    .then(agent => {
      res.status(200).send(agent);
    });
};

module.exports.getbyagentId = function (req, res) {
  console.log("get do service....");
  var doId= req.params.doId;
  var _id = req.body;

  AgentModel.find({ _id: _id,doId:doId }, {agentId:1,city:1,category:1,mobile:1,address1:1})
    .then(agent => {
      res.status(200).send(agent);
    });
};


module.exports.counAgents = async (req, res) => {
  const doId = req.params.doId;
   await AgentModel.find({ doId: doId }).countDocuments().then(result=>{
    console.log("response", result);
    res.send({ success: true, result: result });
  }).catch(err=>{
    res.status(400).send(err);
    console.log("error", err);
  })

}

module.exports.counOfNewAgents = async (req, res) => {
  const moment = require('moment')
const today = moment().startOf('day')

  const doId = req.params.doId;
  const query = {
    doId: doId,
    createdAt: {
      $gte: today.toDate(),
    $lte: moment(today).endOf('day').toDate()
    }
  }
  console.log(query)
   await AgentModel.find(query).countDocuments().then(result=>{
    console.log("response", result);
    res.send({ success: true, result: result });
  }).catch(err=>{
    res.status(400).send(err);
    console.log("error", err);
  })

}

module.exports.postofficeApi = async (req, res) => {
const pinCode=req.body.pinCode;
  const options = {
    url: 'https://nutansms.nutantek.com/clients/getPostOffice.php',
    qs: { pincode:pinCode},

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
}

// add business logic here

module.exports.getAllAgentService = getAllAgentService;
module.exports.inviteAgentService = inviteAgentService;
// module.exports.approveAgentService = approveAgentService;
// module.exports.denyAgentService = denyAgentService;
module.exports.searchAgents = searchAgents;
module.exports.getApprovedAgentService = getApprovedAgentService;
module.exports.getAgentService = getAgentService;
