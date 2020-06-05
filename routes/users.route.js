const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const doService = require('../services/userSignService');

router.post('/users', (req, res) => {
  doService.adminRegister(req, res);
});


router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send({ status: false, message: 'User record not found.' })
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/do/:doId/details', (req, res) => {
  doService.getdoService(req, res);
});

router.put('/do/:doId/editprofile', (req, res) => {
  doService.updateDoDetails(req, res);
});
router.put('/do/:doId/DofinYear/edit', (req, res) => {
  doService.updateDoFinYear(req, res);
});

router.post('/password/forgotPassword', (req, res) => {
  doService.forgotPassword(req, res);
});

router.put('/password/reset', (req, res) => {
  doService.resetPassword(req, res);
});

router.put('/do/:doId/ChangePassword',(req,res)=>{
  doService.ChangePassword(req,res);
})

router.post('/submitQuerybyAnybody',(req,res)=>{
  doService.submitQuerybyAnybody(req,res);
})

router.post('/do/:doId/submitQuerybyClient', (req, res) => {
  doService.submitQuerybyClient(req, res);
});





module.exports = router;
