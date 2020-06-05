const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = require('./routes/agent.route');
const adminrouter= require('./routes/adminRoute');
const targetRouter = require('./routes/target.route');
const grettingsRouter = require('./routes/greetings.route');
const agentGreetings =require('./agentServer/agentRoutes/greetings.route');
const UserSingInUp = require('./routes/users.route');
const fileUploadRoute = require('./routes/uploadFiles.route');
const agentSignInUp = require('./agentServer/agentRoutes/agentUserRoutes');
const recordSaleRoute=require('./agentServer/agentRoutes/recordRoute');
const agentTargets = require('./agentServer/agentRoutes/agentTargets.route');
const agentRecordSales = require("./routes/recordSale.route");
const noticePdfFileUpload = require("./routes/noticeFileUpload.route");
const contribution=require("./routes/ContributionRoute");
const clientRepoRouter =require ('./routes/clientRepositoryroute');
const callManageRoute = require("./routes/callManageRoute");
const smsTemplateRoute= require("./routes/smstemplateroute");
const BulkSMSRoute=require("./routes/bulksmsRoute");
const patymRoute =require("./routes/patymRoute");
const googlDriveApi = require("./googleDrive/googleRoutes");
const prospectsCustomersRoute = require("./routes/prospectsCustomersRoute")
const db = require('./dbConnection');
const path=require('path');
const port = process.env.PORT || 3000;

/********** middlewares ***********/
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/'))
app.use(express.static(__dirname + '/dist'));
app.use(cors({ origin: "*" }));

app.use("/api", router);
 app.use("/api", adminrouter );
 app.use("/api", targetRouter);
 app.use("/api", grettingsRouter);
 app.use("/api", UserSingInUp);
 app.use("/api/agent", agentSignInUp);
app.use("/api/agent" ,recordSaleRoute)
app.use("/api/agent" , agentGreetings);
app.use("/api/agent", agentTargets);
app.use("/api", agentRecordSales);
app.use("/api",fileUploadRoute);
app.use("/api", noticePdfFileUpload);
app.use("/api", contribution);
app.use("/api",callManageRoute);
app.use("/api",clientRepoRouter);
app.use("/api",smsTemplateRoute);
app.use("/api",BulkSMSRoute);
app.use("/api",patymRoute);
app.use("/api", googlDriveApi);
app.use("/api", prospectsCustomersRoute);
app.listen(port, () => {
    console.log('server is up and running' + port);
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist/index.html'))
});




module.exports = app;
