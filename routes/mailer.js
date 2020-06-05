const nodemailer = require('nodemailer');
const Templates = require('../views//emailTemplates.js');



var smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",//"mail.nutantek.com",
  port: 587,
  secure: false, // true for 465, false for other ports: gmail
  service: 'Gmail',
  auth: {
    user: 'lic.agentplus@gmail.com', //enter email id and password for testing
    pass: 'Test@1234'
  },

});


var sendEmail = async function (options, templateType) {
  let Template = Templates(templateType, options);
  options.subject = Template.subject;
  options.html = Template.body;


  console.log("templateType=", templateType);
  console.log("email body=", Template.body);
  await smtpTransport.sendMail(options, function (error, response) {
    if (error) {
      console.log("error in sendMail==", error);
    } else {
      console.log("Message sent: " + response.response);
    }
  });
}




module.exports = sendEmail;

