const callmanageModel = require('../models/callManagementModel');
const callDatafolders = require('../models/CallFolders');
const ObjectId = require('mongodb').ObjectID;
const eventscountModel = require('../models/eventsCount');

module.exports.callManangeService = async (req, res) => {
  const doId = req.params.doId;
  const { data, folder } = req.body;
  console.log(data, folder);
  var promiseSaveArr = [];
  if (Array.isArray(data)) {
    data.forEach(obj => {
      // create excel model
      const XlFile = new callmanageModel({
        doId: doId,
        fullName: obj.fullName,
        mobile: obj.mobile,
        whatsapp: obj.whatsapp,
        address: obj.address,
        city: obj.city,
        status: obj.status,
        pinCode: obj.pinCode,
        folderName: folder.folderName
      });
      // save one obj
      promiseSaveArr.push(XlFile.save());
    });
  }
  return await Promise.all(promiseSaveArr).then(result => {
    res.send({ success: true, message: 'Upload success' });
  }).catch((err) => {
    console.log('err in callManageService ', err);
    res.status(400).send({ success: false, message: err.message })
  });

};

module.exports.addNewContact = async (req, res) => {
  const doId = req.params.doId;
  const { fullName, mobile, whatsapp } = req.body;
  const newContact = new callmanageModel({
    doId: doId,
    fullName: fullName,
    mobile: mobile,
    whatsapp: whatsapp,
    address: "address",
    city: "city",
    status: "All",
    pinCode: 55555,
    category: "All",
    folderName: 'myContacts'

  });
  return await newContact.save().then(result => {
    res.send({ success: true, message: 'new contact added sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in call Manage service', err);
    res.status(400).send({ success: false, message: err.message })
  });
}


module.exports.createFolderbyDo = async (req, res) => {
  const doId = req.params.doId;
  const { folderName } = req.body;
  const folder = new callDatafolders({
    doId: doId,
    folderName: folderName,
  });
  return await folder.save().then(result => {
    res.send({ success: true, message: 'Folder created sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in call Manage service', err);
    res.status(400).send({ success: false, message: err.message })
  });

};

module.exports.createDefaultFolder = async (req, res) => {
  const doId = req.params.doId;
  const folder = new callDatafolders({
    doId: doId,
    folderName: 'myContacts',
  });
  return await folder.save().then(result => {
    res.send({ success: true, message: 'Folder created sucessfully' });
    console.log(result)
  }).catch((err) => {
    console.log('err in call Manage service', err);
    res.status(400).send({ success: false, message: err.message })
  });

};

module.exports.getCalDataFolders = function (req, res) {
  const doId = req.params.doId;
  console.log(doId);
  callDatafolders.find({ doId: doId }, { folderName: 1 })
    .then(result => {
      res.status(200).send(result);
    });
};

module.exports.getCallData = function (req, res) {
  console.log("get all agents service....");
  const doId = req.params.doId;
  const { folderName } = req.body;

  callmanageModel.find({ doId: doId, folderName: folderName }, { __v: 0 })
    .then(CallData => {
      res.status(200).send(CallData);

    });
};

module.exports.getUserDetails = function (req, res) {
  console.log("get User Details service....");
  const doId = req.params.doId;
  const { _id } = req.body;

  callmanageModel.findById({ doId: doId, _id: _id }, { __v: 0 })
    .then(CallData => {
      res.status(200).send(CallData);
    });
};

module.exports.updateCallData = (req, res) => {

  var { _id, fullName, mobile, whatsapp, city, address, status, pinCode } = req.body;
  var query = { _id: ObjectId(_id) };
  console.log(query)
  const newvalues = {
    $set: {
      fullName: fullName, mobile: mobile, whatsapp: whatsapp, city: city,
      address: address, status: status, pinCode: pinCode
    }
  };
  callmanageModel.findOneAndUpdate(query, newvalues, { new: true })
    .then(CallData => {
      console.log(CallData);
      res.send({ CallData: CallData, message: "success" });
    })
    .catch((err) => {
      console.log('err in statement', err);
      res.status(400).send({ success: false, message: err.message })
    });

}

module.exports.deleteCallData = async (req, res) => {
  var doId = req.params.doId;
  var { _id } = req.body;
  await callmanageModel.deleteOne({ doId: doId, _id: _id }, { _v: 0 })
    .then((result) => {
      console.log(result);
      res.send({ success: true, message: 'file Updated successfully' });
    });
};

module.exports.getbyDate = async (req, res) => {
  var doId = req.params.doId;
  var { fromDate, toDate, status, category } = req.body;
  console.log(new Date(fromDate), new Date(toDate))
  const query = {
    doId: doId,
    createdAt: {
      $gte: new Date(fromDate),
      $lte: new Date(toDate)
    },
    status: status, category: category

  }
  const rec = await callDatafolders.find(query, { _v: 0 })
  if (rec) {
    console.log("response", rec);

    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
};


module.exports.InsertEvents = async (req, res) => {
  const doId = req.params.doId;
  const { call, whatsaap, sms } = req.body;
  const query = {
    doId: doId,
    call: call, whatsaap: whatsaap, sms: sms
  }
  const rec = await eventscountModel.create(query);
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}


module.exports.counDouments = async (req, res) => {
  const doId = req.params.doId;
  const data = await eventscountModel.find({ doId: doId }).countDocuments()
  if (data) {
    console.log("response", data);
    res.send({ success: true, data: data });
  } else {
    console.log("error", data);
  }
}


module.exports.targetCount = async (req, res) => {
  const data = await eventscountModel.aggregate([
    {
      "$facet": {
        "call": [
          { "$match": { "call": { "$exists": true } } },
          { "$count": "call" },
        ],
        "whatsaap": [
          { "$match": { "whatsaap": { "$exists": true, "$nin": [""] } } },
          { "$count": "whatsaap" }
        ],
        "sms": [
          { "$match": { "sms": { "$exists": true, "$nin": [""] } } },
          { "$count": "sms" }
        ]
      }
    },
    {
      "$project": {
        "call": { "$arrayElemAt": ["$call.call", 0] },
        "whatsaap": { "$arrayElemAt": ["$whatsaap.whatsaap", 0] },
        "sms": { "$arrayElemAt": ["$sms.sms", 0] },
      }
    }
  ])
  if (data) {
    console.log("response", data);
    res.send({ success: true, data: data });
  } else {
    console.log("error", data);
  }
}

module.exports.getbyfilter = async (req, res) => {
  const doId = req.params.doId;
  const { status, category } = req.body;
  const query = {
    doId: doId,
    status: status,
    category: category
  };
  const rec = await callmanageModel.find(query, { _v: 0 })
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}


module.exports.getbulkdata = async (req, res) => {
  const doId = req.params.doId;
  const { status, folderName } = req.body;
  const query = {
    doId: doId,
    status: status,
    folderName: folderName
  };
  const rec = await callmanageModel.find(query, { mobile: 1 })
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}



module.exports.getByperviousDate = async (req, res) => {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const query = {
    createdAt: yesterday
  };
  console.log(query)
  const rec = await callmanageModel.find(query, { _v: 0 })
  if (rec) {
    console.log("response", rec);
    res.send({ success: true, data: rec });
  } else {
    console.log("error", rec);
  }
}



module.exports.prospectcustomerUpload = async (req, res) => {
  const doId = req.params.doId;
  const { data,folder } = req.body;
console.log(folder)
  var promiseSaveArr = [];
  if (Array.isArray(data)) {
    data.forEach(obj => {
      // create excel model
      const XlFile = new callmanageModel({
        doId: doId,
        fullName: obj.name,
        email:obj.email,
        mobile: obj.mobilenumber,
        whatsapp: obj.mobilenumber,
        address: "address",
        city: obj.city,
        status: "All",
        pinCode: 55555,
        category: "All",
        folderName: folder.folderName
      });
      // save one obj
      promiseSaveArr.push(XlFile.save());
    });
  }
  return await Promise.all(promiseSaveArr).then(result => {
    res.status(200).send({ success: true, message: 'Data imported  sucessfully' });
  }).catch((err) => {
    console.log('err in callManageService ', err);
    res.status(400).send({ success: false, message: err.message })
  });

};
