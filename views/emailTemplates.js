const CONST = require('../constants/constants.js');

var REGISTRATION_URL, FORGOT_PASSWORD_URL;

var templates = function(templateType, options) {
    REGISTRATION_URL = 'https://radiant-plains-67878.herokuapp.com'  + CONST.REGISTRATION_URL+'/' +options.doId ;
    FORGOT_PASSWORD_URL = 'http://' + options.host+':4200' + CONST.FORGOT_PASSWORD_URL + options.to + '/' + options.token;
    // 'https://radiant-plains-67878.herokuapp.com'

    switch(templateType) {
        case CONST.INVITE_AGENT:
            return inviteAgent(options);
            case CONST.SEND_GREETING:
              return sendGreetings(options);
            case CONST.registrationEmail:
              return sendRegistrationDetails(options);
              case CONST.AGENTPASSWORD:
                return agentPasswordEmail(options);
        case CONST.FORGOT_PASSWORD:
            return forgotPassword(options);
        case CONST.RESET_PASSWORD_DONE:
            return resetPasswordDone(options);
    }
}

/**
 * @param {*} options
 * agentName, doName
 */
function inviteAgent(options) {
  var doName = options.doName;

  const subject = "Invitation for LIC Agent";

  const body =
  `<html>
  <body>
  <p>
  Hi,<br>
  <br>
  Please accept invitation by accessing the below registration link.<br>
  <br>
  Please navigate here: ${REGISTRATION_URL}<br>
  <br>
  Regards,<br>
  ${doName}
  </p>
  </body>
  </html>`;

  return { subject: subject, body: body };
}

function sendRegistrationDetails (message){
  console.log('email template')
  var userEmail = message.userEmail;
  var userPassword = message.userPassword;
  var doName = message.doName;
   const subject = 'New registration'
  const body =
  `<html>
  <body>
  <h3>
  Hi,<br>
 <p> Your profile registered sucessfully on Agentplus login with below credentials<p>
  <br>
  UserName:
  ${userEmail}
  <br>
  Please navigate here: ${REGISTRATION_URL}<br>
  Regards,
  <br>
  ${doName}
  </h3>
  </body>
  </html>`;

  return { subject: subject, body: body, };
}

function agentPasswordEmail (password){
  var userPassword = password.userPassword;
  var doName = password.doName;
   const subject = 'New registration'
  const body =
  `<html>
  <body>
  <h3>
  Hi,<br>
  Password:
  ${userPassword}
  <br>
  Regards,
  <br>
  ${doName}
  </h3>
  </body>
  </html>`;

  return { subject: subject, body: body, };
}

function sendGreetings(options) {
  var message = options.message;
  var occassion = options.occassion;
  var doName = options.doName;
  const subject = occassion;

  const body =
  `<html>
  <body>
  <h3>
  Hi,<br>
  <br>
  ${message}
  <br>
  <img src="options.attachments[0].path" width="50%" height="25%"/>
  <br>
  Regards,
  <br>
  ${doName}
  </h3>
  </body>
  </html>`;

  return { subject: subject, body: body, };
}

/**
 * @param {*} options
 * hostname, email, token
 */
function forgotPassword(options) {

const subject = "Forgotpassword";


    const body =
    `<html>
    <body>
    <p>
    Hi,<br>
    <br>
    Please reset password by accessing below link:<br>
    ${FORGOT_PASSWORD_URL}<br>
    <br>
    This link is valid for 10 minutes.
    <br>
    Regards,<br>
    NutanTek
    </p>
    </body>
    </html>`;

    return { subject: subject, body: body };
  }

  /**
 * @param {*} options
 * username
 */
function resetPasswordDone(options) {
    const subject = "Reset Password successful";

    const body =
    `<html>
    <body>
    <p>
    Hi,<br>
    <br>
    Your password was successfully reset.<br>
    <br>
    Regards,<br>
    NutanTek
    </p>
    </body>
    </html>`;

    return { subject: subject, body: body };
  }

module.exports = templates;
