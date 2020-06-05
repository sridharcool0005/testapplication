const express = require('express');
const agentSignInUp = express.Router();
const AgentUser = require('../../models/agent.model');
const auth = require('../../middleware/auth');
const agentService=require('../agentServices/agentUserSignService');


// agentSignInUp.post('/register', async (req, res) => {
//     const user = new AgentUser(req.body)
//     agentService.register(req,res);
//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({ user, token })
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

agentSignInUp.post('/users/login', async (req, res) => {
    console.log(req.body.email, req.body.password);
    try {
        const user = await AgentUser.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

agentSignInUp.post('/users/logout', auth, async (req, res) => {
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

agentSignInUp.get('/do/:doId/details', (req,res)=>{
  agentService.getdoService(req,res);
});

agentSignInUp.put('/edit/:agentId/editprofile', (req,res)=>{
  agentService.updateAgentDetails(req,res);
});

// agentSignInUp.get('/agent/:agentId/do/:doId/details', (req,res)=>{
//   agentService.getagentService(req,res);
// });

module.exports = agentSignInUp;
