const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
// const AgentUser = require('../agentModals/agentUser.modal');
const AgentUser = require('../../models/agent.model');

// const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    const user = new AgentUser();
    user.doId=req.params.doId;
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.Maritial=req.body.Maritial;
    user.gender=req.body.gender,
    user.DOB=req.body.DOB;
    user.DOA=req.body.DOA;
    user.mobile=req.body. mobile;
    user.whatsapp=req.body. whatsapp;
    user.address=req.body.address;
    user.state=req.body. state;
    user.pincode=req.body. pincode;
    user.city=req.body.body.city;
    user.profilePic=req.body.profilePic

    console.log(user);
    user.save((err, doc) => {
        if (!err)

            res.send(doc,"successfully registered");
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res, next);
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}


module.exports.updateAgentDetails = async (req, res) => {
  var agentId = req.params.agentId;
  var name = req.body.name;
  var Maritual = req.body.Maritual;
  var gender = req.body.gender;
  var DOB = req.body.DOB;
  var DOA = req.body.DOA;
  var email = req.body.email;
  var password = req.body.password;
  var mobile = req.body.mobile;
  var whatsapp = req.body.whatsapp;
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var state = req.body.state;
  var pincode = req.body.pincode;
  var city = req.body.city;

  console.log(agentId, name, email, DOA, DOB, password, Maritual, gender, mobile, whatsapp, address1, address2, pincode, state, city);

  await AgentUser.updateOne({ agentId: agentId }, { name, email, DOA, DOB, password, Maritual, gender, mobile, whatsapp, address1, address2, pincode, state, city })
    .then((result) => {
      console.log(result);
      res.send("SUCCESS");
    });
};



var getagentService = function (req, res) {
  console.log("get agent service....");

  var agentId = req.params.agentId;



  User.find({ agentId: agentId }, { __v: 0 })
    .then(user => {
      res.status(200).send(user);
    });
};

module.exports.getagentService=getagentService
