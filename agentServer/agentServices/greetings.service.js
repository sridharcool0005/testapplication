const sendEmail = require('../agentRoutes/mailer');
const CONST = require('../constants/constants');
const Templates = require('../views//emailTemplates.js');
const   GreetingsModel=require('../agentModels/greetingsModel');
module.exports.sendGreetingsService = function (req, res) {
    var options = {};
    options.occassion = req.body.occassion;
    options.message = req.body.message;

    //options.agentName = "Suresh";
    options.doName = "Suresh";
    var toEmail = req.body.emailsArr;   // "agent@example.com";
    var ccEmail = [];

    sendEmail(toEmail, ccEmail, options, CONST.SEND_GREETING);

    res.send("SUCCESS");
  };


  module.exports.sendGreetingsService = async (req, res) => {
    const {agentId } = req.params;
    const { occassion,emailsArr,message} = req.body;
  console.log(req.body);
    const greetings = new GreetingsModel({
      occassion: occassion,
      emailsArr: emailsArr,
      message: message,
      agentId:agentId

    });

    return await greetings.save()
      .then((result) => {
        res.send({ success: true, message: 'greetings sent success' });
      })
      .catch((err) => {
        console.log('err in sending Greetings', err);
        res.status(400).send({ success: false, message: err.message })
      });
  };


module.exports.previewGreetingsService = function (req, res) {
    var options = {};
    options.occassion = req.body.occassion;
    options.message = req.body.message;

    let Template = Templates(CONST.SEND_GREETING, options);
    res.send(Template.body);
    console.log("templateType=", templateType);
    console.log("email body=", Template.body);  // remove after development
}
