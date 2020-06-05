var express = require('express');
var agentGreetings = express.Router();
const greetingsService = require('../agentServices/greetings.service');

agentGreetings.post('/greetings/:agentId/send' ,(req, res) => {
  greetingsService.sendGreetingsService(req, res);
});

agentGreetings.post('/greetings/preview', (req, res) => {
  greetingsService.previewGreetingsService(req, res);
})
module.exports = agentGreetings;
