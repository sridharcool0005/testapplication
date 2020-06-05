var express = require('express');
var router = express.Router();
const routeGreetingsService = require('../services/greetings.service');


router.post('/greetings/send' ,(req, res) => {
    routeGreetingsService.sendGreetingsService(req, res);
});

router.post('/greetings/preview', (req, res) => {
    routeGreetingsService.previewGreetingsService(req, res);
})

router.get('/do/:doId/occassions', (req, res) => {
  routeGreetingsService.fetchOccassions(req, res);
})

router.get('/do/:doId/fetchSystemTemplatesTypes', (req, res) => {
  routeGreetingsService.fetchSystemTemplatesTypes(req, res);
})

router.post('/do/:doId/fetchSystemtemplateAll', (req, res) => {
  routeGreetingsService.fetchSystemtemplateAll(req, res);
})


router.post('/do/:doId/createGreetingFolders', (req, res) => {
  routeGreetingsService.createFolderbyDo(req, res);
})

router.get('/do/:doId/getGreetingFolders', (req, res) => {
  routeGreetingsService.getfolders(req, res);
})



module.exports = router;

