const CONST = require('../constants/constants.js');

var REGISTRATION_URL;

var templates = function(templateType, options) {
    REGISTRATION_URL = 'http://' + options.host +'/' + options.doId + CONST.REGISTRATION_URL;

    switch(templateType) {
        case CONST.INVITE_AGENT:
            return inviteAgent(options);
            break;
        case CONST.SEND_GREETING:
            return sendGreetings(options)
    }
}

/**
 * @param {*} options
 * agentName, doName
 */

function sendGreetings(options) {
    var message = options.message;
    var occassion = options.occassion;
    var doName = options.doName;
    const subject = occassion;

    const body =
    `<html>
    <body>
    <p>
    Hi,<br>
    <br>
    ${message}
    <br>
    <br>
    Regards,<br>
    ${doName}
    </p>
    </body>
    </html>`;

    return { subject: subject, body: body };
}

module.exports = templates;
