const personalModel = require('../models/clientsRepositoryModel');
const folderModel= require('../models/folderModel');
let clientDocsModel=require('../models/clientDocsModel');
const agentModel= require('../models/agent.model');

module.exports.getClientRepos = function (req, res) {
  const agentId = req.params.agentId;
  console.log(agentId);
  personalModel.find({ agentId: agentId }, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.createFolder = async (req, res) => {
  const agentId = req.params.agentId;
  const {folderName} = req.body;
    const folder = new folderModel({
      agentId: agentId,
      folderName:folderName,

    });
  return await   folder.save().then(result => {
    res.send({ success: true, message: 'Folder created sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  });


};



module.exports.createFolderbyDo = async (req, res) => {
  const doId = req.params.doId;
  const {folderName} = req.body;
    const folder = new folderModel({
      doId: doId,
      folderName:folderName,

    });
  return await   folder.save().then(result => {
    res.send({ success: true, message: 'Folder created sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  });

};



module.exports.getfolders = function (req, res) {
  const agentId = req.params.agentId;
  console.log(agentId);
  folderModel.find({agentId: agentId}, { folderName:1})
    .then(result => {
      res.status(200).send(result);
    });
};


module.exports.getfoldersofDo = function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  folderModel.find({doId: doId}, { folderName:1})
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getfiles = function (req, res) {
  const agentId = req.params.agentId;
  const {folderName}=req.body;
  console.log(agentId);
  personalModel.find({agentId: agentId,folderName:folderName}, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};



module.exports.getclientsList = function (req, res) {
  const agentId = req.params.agentId;
  console.log(agentId);
  personalModel.find({agentId: agentId}, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};


module.exports.getDoClientsList = function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  personalModel.find({doId: doId}, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};


module.exports.searchClients=function(req,res){
  const doId = req.params.doId;
  const{fullName,folderName,mobile}=req.body;
  const query = { };

  if (fullName) {
    query.fullName = fullName;
  }
  if (doId) {
    query.doId=doId;
  }
  if (folderName) {
    query.folderName=folderName;
  }
  if (mobile) {
    query.mobile=mobile;
  }
  console.log(query)
  personalModel.find(query,{_v:0})
  .then(result=>{
    res.status(200).send(result);
    console.log(result)
  })
};


module.exports.searchpolicyDocs=function(req,res){
  const doId = req.params.doId;
  const{folderName}=req.body;
  folderModel.find({doId:doId,folderName:folderName},{_v:0})
  .then(result=>{
    res.status(200).send(result);
    console.log(result)
  })

};



module.exports.addNewClient = async (req, res) => {
  const doId = req.params.doId;
  const {fullName,whatsaap,mobile} = req.body;
    const folder = new personalModel({
      doId: doId,
      fullName:fullName,
      whatsaap:whatsaap,
      mobile:mobile,
      folderName:fullName,
    });
  return await   folder.save().then(result => {
    res.send({ success: true, message: 'new client added sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  });

};


module.exports.addcustomersfromAutosms = async (req, res) => {
  const doId = req.params.doId;
  const { data} = req.body;
  console.log(data);
  var promiseSaveArr = [];
  if (Array.isArray(data)) {
    data.forEach(obj => {
      // create excel model
      const XlFile = new personalModel({
        doId: doId,
        fullName: obj.name,
        mobile: obj.mobilenumber,
        whatsapp: obj.whatsapp,
        city: obj.city,
        folderName: obj.name,
        email:obj.email

      });
      // save one obj
      promiseSaveArr.push(XlFile.save());
    });
  }
   await Promise.all(promiseSaveArr).then(result => {
    res.send({ success: true, message: 'new client added sucessfully' });
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  })
};

module.exports.createfoldersforCustomers = async (req, res) => {
  const doId = req.params.doId;
  const { data} = req.body;
  console.log(data);
  var promiseSaveArr = [];
  if (Array.isArray(data)) {
    data.forEach(obj => {
      // create excel model
      const XlFile = new folderModel({
        doId: doId,
        folderName: obj.name,
      });
      // save one obj
      promiseSaveArr.push(XlFile.save());
    });
  }
   await Promise.all(promiseSaveArr).then(result => {
    res.send({ success: true, message: 'labels  created sucessfully' });
  }).catch((err) => {
    console.log('err in client repo service', err);
    res.status(400).send({ success: false, message: err.message })
  })
};

module.exports.getMyContacts = async (req, res) => {
  const doId = req.params.doId;
  const query = {
    doId: doId
  };
  const rec = await personalModel.find( query,{ mobile:1 ,fullName:1})
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}


module.exports.getMyTeam = async (req, res) => {
  const doId = req.params.doId;
  const query = {
    doId: doId
  };
  const rec = await agentModel.find( query,{ mobile:1 ,firstName:1,lastName:1,email:1})
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}

module.exports.getDoClientsData = function (req, res) {
  const doId = req.params.doId;
  const {folderName}=req.body;
  console.log(doId);
  clientDocsModel.find({doId: doId,folderName:folderName}, { __v: 0 })
    .then(result => {
      res.status(200).send(result);
    });
};
