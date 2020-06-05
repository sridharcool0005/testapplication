const nodemailer = require('nodemailer');
const Templates = require('../views//emailTemplates');



var smtpTransport = nodemailer.createTransport({
     host: "smtp.gmail.com",//"mail.nutantek.com",
    port: 587,
    secure: false, // true for 465, false for other ports: gmail
    service: 'Gmail',
     auth: {
      user: 'lic.agentplus@gmail.com', //enter email id and password for testing
       pass:'Test@1234'
     },
    // rejectUnauthorized:false
});

var sendEmail = async function(toEmailId, ccEmailId, options, templateType) {
    let mailOptions = {};
    mailOptions.from = "webmaster@nutantek.com";
    mailOptions.to = toEmailId;
    mailOptions.cc = ccEmailId;

    let Template = Templates(templateType, options);
    mailOptions.subject = Template.subject;
    mailOptions.html = Template.body;

    console.log("templateType=", templateType);
    console.log("email body=", Template.body);  // remove after development

    await smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log("error in sendMail==", error);
        } else {
            console.log("Message sent: " + response.response);
        }
    });
}

module.exports = sendEmail;
