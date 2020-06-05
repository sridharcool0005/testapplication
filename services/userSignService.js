const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const User = require('../models/user');
const CONST = require('../constants/constants');
const ForgotPassword = require('../models/forgotPassword.model');
const sendEmail = require('../routes/mailer');
const crypto = require("crypto");
const request = require('request');
const bcrypt = require('bcryptjs')
const saltRounds = 10;
var formidable = require('formidable');
var fs = require('fs')
// const User = mongoose.model('User');

module.exports.adminRegister = async (req, res) => {
  const id = crypto.randomBytes(6).toString("hex");

  const user = req.body;
  user.doId = id;
  const firstname = user.firstname;
  const lastname = user.lastname;
  const Maritial = user.Maritial;
  const DOB = user.DOB;
  const DOA = user.DOA;
  const gender = user.gender;
  const email = user.email;
  const password = user.password;
  const mobile = user.mobile;
  const whatsapp = user.whatsapp;
  const address1 = user.address1;
  const address2 = user.address2;
  const state = user.state;
  const pincode = user.pincode;
  const city = user.city;
  const postoffice = user.postoffice;
  const district = user.district;
  const profilePic = user.profilePic;

  if (!firstname || !lastname || !postoffice || !district || !DOB || !email || !password || !state || !profilePic || !DOA || !DOB || !Maritial || !gender || !mobile || !whatsapp || !address1 || !address2 || !pincode) {
    console.log(email, password, mobile, whatsapp, address1, address2, pincode, state, city, DOB, Maritial, gender)
    return res.status(400).send({ message: 'error in registration' })
  }
  try {
    const userSaved = await saveUser(user);
    user.authKey = userSaved._id;
    const msgReg = await registerMsg91(user);
    const savedinP = await saveInSMSPortal(user, msgReg);
    const sendpwd = await sendPassword(user);
    if (msgReg && userSaved && savedinP && sendpwd) {
      res.status(200).send({ status: "success", message: 'user created sucessfully' })
    }
  } catch (e) {
    res.status(400).send(e)
  }
}

const registerMsg91 = (user) => {
  try {
    console.log('registering in msg 91')
    return new Promise((resolve, reject) => {
      let username = user.firstname.substr(0, 4) + user.mobile.substr(6, 9);
      let fullname = user.firstname + ' ' + user.lastname;
      console.log(fullname)
      console.log(username)
      const options = {
        url: 'https://api.msg91.com/api/add_client.php',
        qs: {
          authkey: '315865AcmnjuCaqQo5e32d86eP1',
          user_full_name: fullname,
          user_name: username,
          user_mobile_number: user.mobile,
          user_email: user.email,
          user_company_name: "Insurance",
          user_industry: "LicDo",
          user_country_code: "91"
        },
        json: true,
      };
      request(options, (err, response, body) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          console.log(body);
          resolve(body);
        }
      });
    });
  } catch (err) {
    throw err
  }
}

const saveUser = (user) => {
  try {
    console.log('saving user')
    const newUser = new User(user);
    const userSaved = newUser.save();
    if (userSaved) {
      return userSaved;
    } else {
      throw 'Unable to save user';
    }
  } catch (err) {
    throw err
  }
}

const saveInSMSPortal = (user, msgReg) => {
  console.log(msgReg.msg_type)
  try {
    console.log('saving in sms portal')
    return new Promise((resolve, reject) => {
      const api = 'https://www.nutansms.nutantek.com/clients/addNewClient.php?sales_channel=agentplus';
      let username = user.firstname.substr(0, 4) + user.mobile.substr(6, 9);
      const options = {
        url: api,
        body: {
          client_id: user.doId,
          client_authkey: user.authKey,
          client_firstname: user.firstname,
          client_lastname: user.lastname,
          client_user_id: username,
          client_mobile_number: user.mobile,
          client_whatsapp_number: user.whatsapp,
          client_email: user.email,
          client_address1: user.address1,
          client_address2: user.address2,
          client_city: user.city,
          client_pincode: user.pincode,
          client_postoffice: user.postoffice,
          client_district: user.district,
          client_state: user.state,
          client_company_name: " ",
          client_country: "",
          client_industry: " ",
          // default set to 91.... to update if support opens for other countries
          client_country_code: " 91",
          client_website: " ",
          client_facebook: " ",
          client_linkedin: " ",
          client_gst_number: " ",
          client_smsgateway: msgReg.msg_type
        },
        headers: {
          'Authorization': 'bh#xg6sf(gs67nsbsf99gsf%nn'
        },
        json: true,
        method: 'POST',
      }
      request(options, (err, response, body) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          console.log(body, 'body')
          resolve(true);
        }
      });
    })
  } catch (e) {
    throw e
  }

}


const sendPassword = (user) => {
  try {
    console.log('sending password to smsportal')
    return new Promise((resolve, reject) => {
      const api = 'https://www.nutansms.nutantek.com/clients/setPassword.php';
      const options = {
        url: api,
        qs: {
          client_id: user.doId,
          temp: user.password
        },
        headers: {
          'Authorization': user.authKey
        },
        json: true,
        method: 'POST',
      }
      request(options, (err, response, body) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          console.log(body, 'body')
          resolve(true);
        }
      });
    })
  } catch (e) {
    throw e
  }

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

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id },
    (err, user) => {
      if (!user)
        return res.status(404).json({ status: false, message: 'User record not found.' });
      else
        return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
    }
  );
}


var getdoService = function (req, res) {
  console.log("get do service....");
  var query = {};
  var doId = req.params.doId;

  User.find({ doId: doId }, { __v: 0 })
    .then(user => {
      res.status(200).send(user);
    });
};


module.exports.updateDoDetails = async (req, res) => {
  var doId = req.params.doId;
  var name = req.body.name;
  var Maritual = req.body.Maritual;
  var DOB = req.body.DOB;
  var DOA = req.body.DOA;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var whatsapp = req.body.whatsapp;
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var state = req.body.state;
  var pincode = req.body.pincode;
  var city = req.body.city;

  console.log(doId, name, email, DOA, DOB, Maritual, mobile, whatsapp, address1, address2, pincode, state, city);

  await User.update({ doId: doId }, { name, email, DOA, DOB, Maritual, mobile, whatsapp, address1, address2, pincode, state, city })
    .then((result) => {
      console.log(result);
      res.send("SUCCESS");
    });
};
module.exports.updateDoFinYear = async (req, res) => {
  var doId = req.params.doId;
  var currentFinYear = req.body.currentFinYear;

  console.log(doId);

  await User.update({ doId: doId }, { currentFinYear })
    .then((result) => {
      console.log(result);
      res.status(200).json({ "message": "SUCCESS" });
    });
};


function generateResetPassowrdToken(emailId) {
  let token = '';
  token = crypto.randomBytes(16).toString('hex');
  // bcrypt.hash(token, null, null, function (err, hash) {
  //   return hash;
  // });
  return token;
}

module.exports.forgotPassword = (req, res) => {
  console.log("Forgot Password");
  var { email } = req.body;

  // generate token
  // save in db
  // send email

  let token = generateResetPassowrdToken();
  //token = "12234A"; // for testing

  return User.findOne({ email: email })
    .then(user => {
      if (!user) return Promise.reject("Invalid user");
      return ForgotPassword.findOne({ email: email });
    })
    .then(record => {
      let forgotPassword = new ForgotPassword();
      if (record) {
        forgotPassword._id = record._id;
        forgotPassword.isNew = false; // to update if record existing (upsert)
      }
      forgotPassword.email = email;
      forgotPassword.token = token;

      return forgotPassword.save();
    })
    .then((doc) => {
      // save returns result and error in catch
      // send email

      let options = {};
      options.to = email;
      options.token = token;
      options.host = req.hostname;
      console.log(options)
      sendEmail(options, CONST.FORGOT_PASSWORD);
      res.status(200).send({ message: "Email send success", status: "success" });
    })
    .catch(err => {
      res.status(400).send({ error: err, message: "Email not found" });
    });
};

module.exports.resetPassword = (req, res) => {
  console.log("Password reset.....");

  let { email, token } = req.body;

  let forgotPasswordId;
  return ForgotPassword.findOne({ email: email, token: token })
    .then(forgotPasswordRecord => {
      if (!forgotPasswordRecord) return Promise.reject({ message: "Invalid link" });
      forgotPasswordId = forgotPasswordRecord._id;

      let diffMs = new Date() - forgotPasswordRecord.updatedAt;
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

      if (diffMins <= CONST.FORGOT_PASSWORD_LINK_VALID_TIME) { // 10 minutes


        return User.updateOne({ email: email }, { $set: { password: req.body.password } });


      } else {
        return Promise.reject({ message: "Link expired" }); // link expired
      }
    })
    .then((numRecords) => {
      console.log("number of records=", numRecords);
      // n: records matched, nModified: records updated
      // if same value to update then nModified is 0
      if (numRecords.n == 0 && numRecords.nModified == 0)
        return Promise.reject({ message: "Invalid link" }); // User not found

      // send email
      // "agent@example.com";

      let options = {};
      options.to = email;
      options.host = req.hostname;
      // options.name = fetch from db;
      sendEmail(options, CONST.RESET_PASSWORD_DONE);
      return res.status(200).send({ status: "success", message: "Password reset successful" });
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    })
    .finally(() => {
      if (forgotPasswordId)
        ForgotPassword.findByIdAndDelete(forgotPasswordId).then(result => { });
    });
};


module.exports.ChangePassword = async (req, res) => {
  const doId = req.params.doId;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    User.update({ doId: doId }, {

      password: hash
    }).then(response => {
      res.status(200).send({ response: response, message: "success" })
    }).catch(err => {
      res.status(400).send(err)
    })

  });
}

module.exports.submitQuerybyAnybody = async (req, res) => {
  const { name, mobilenumber, email, subject, message } = req.body;

  const options = {

    url: 'https://www.nutansms.nutantek.com/clients/submitQuerybyAnybody.php',
    body: {
      name: name,
      mobilenumber: mobilenumber,
      email: email,
      subject: subject,
      message: message
    },
    json: true,
    method:'POST'

  }

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


module.exports.submitQuerybyClient = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log(files,fields);
   const fileToUpload = files.uploadfile;

    let formData = {
      uploadfile: {
        value: fs.createReadStream(files.uploadfile.path),
        options: {
          filename: fileToUpload.name,
          contentType: fileToUpload.type
        }
      },
      message:fields.message,
      subject:fields.subject
    }

    console.log(formData)

  let options = {
    url: 'https://www.nutansms.nutantek.com/clients/submitQuerybyClient.php',
    method: 'POST',
    qs: {client_id:doId},
    headers: {
      'authorization': authkey,
    },
    json: true,
    formData: formData
    }

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
});
}


module.exports.getdoService = getdoService
