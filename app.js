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
const db = require('./dbConnection');
const port = process.env.PORT || 3000;

/********** middlewares ***********/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/'))
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
app.use("/api",contribution)
app.listen(port, () => {
    console.log('server is up and running' + port);
});






module.exports = app;
