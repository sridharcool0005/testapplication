const request = require('request');
const fetchProspectsdataApi = 'https://agentapp.fundguard.in/fetchProspectsCustomersdata.php';
const AddProspectsDataApi = 'https://agentapp.fundguard.in/addmanualProspectsCustomersdata.php';
const fetchprospectcustomerbyId = 'https://agentapp.fundguard.in/fetchProspectCustomer.php';
const editProspectsCustomersApi = 'https://agentapp.fundguard.in/editProspectsCustomersdata.php';
const ImportXlApi = 'https://agentapp.fundguard.in/importExcel.php'
const fetchAuthKey = 'https://nutansms.nutantek.com/clients/getAutosmsToken.php';
const logfileApi='https://agentapp.fundguard.in/forceDownloadfile.php';
const searchApi='https://agentapp.fundguard.in/searchProspectsCustomers.php';
const customerSearchApi='https://agentapp.fundguard.in/searchProspectsCustomers.php'

var formidable = require('formidable');
var fs = require('fs')

module.exports.fetchProspectsCustomersdata = async (req, res) => {
  const {authKey}=req.body;
  console.log(authKey)
  const options = {
    url: fetchProspectsdataApi,
    qs: { id: 'c61f0294b6c8', type: 'P' },
    json: true,
    headers: {
      'authorization': authKey
    }
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}

module.exports.fetchCustomersdata = async (req, res) => {
  const {authKey}=req.body;
  const options = {
    url: fetchProspectsdataApi,
    qs: { id: 'c61f0294b6c8', type: 'C' },
    json: true,
    headers: {
      'authorization': authKey
    }
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}
module.exports.addProspectsCustomersdata = async (req, res) => {
  const { type, name, email, country_code, mobilenumber, city, notes,authKey } = req.body;
  const options = {
    url: AddProspectsDataApi,
    qs: { id: 'c61f0294b6c8' },
    json: true,
    headers: {
      'authorization': authKey
    },
    body: {
      type: type,
      name: name,
      email: email,
      country_code: country_code,
      mobilenumber: mobilenumber,
      city: city,
      notes: notes
    },
    method: 'POST',
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}

module.exports.fetchprospectcustomerbyId = async (req, res) => {
  const { pcid,authKey } = req.body;
  const options = {
    url: fetchprospectcustomerbyId,
    qs: { id: 'c61f0294b6c8', pcid: pcid },
    json: true,
    headers: {
      'authorization': authKey
    },

  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}


module.exports.editProspectsCustomersdata = async (req, res) => {
  const { pcid, type, name, email, country_code, mobilenumber, city, notes,authKey } = req.body;

  const options = {
    url: editProspectsCustomersApi,
    qs: { id: 'c61f0294b6c8' },
    json: true,
    headers: {
      'authorization': authKey
    },
    body: {
      pcid: pcid,
      type: type,
      name: name,
      email: email,
      country_code: country_code,
      mobilenumber: mobilenumber,
      city: city,
      notes: notes
    },
    method: 'POST',
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}


module.exports.ImportXlApi = async (req, res) => {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // console.log(files.uploadfile);
   const fileToUpload = files.uploadfile;
    let formData = {
      uploadfile: {
        value: fs.createReadStream(files.uploadfile.path),
        options: {
          filename: fileToUpload.name,
          contentType: fileToUpload.type
        }
      }
    }

    console.log(formData)

  let options = {
    url: ImportXlApi,
    method: 'POST',
    qs: {id:doId,data_type:'Prospects'},
    headers: {
      'authorization': authkey,
    },
    json: true,
    formData: formData
    }

    request(options, (err, response, body) => {
      // console.log(err)
      // console.log(response)
      console.log(body)
      if (err) {
        res.json(err)
      } else {
        res.json(body)
      }
    });
  });

}



module.exports.fetchAuthKeyData = async (req, res) => {

  const options = {
    url: fetchAuthKey,
    qs: { client_id: 'c61f0294b6c8' },
    json: true,
    headers: {
      'authorization': '5ed48c7c64b9c13d40c3f516'
    }
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    authKey = body.token

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}


module.exports.logfiledownload = async (req, res) => {

  const options = {
    url: logfileApi,
    qs: { id: 'c61f0294b6c8',file:'logfile' },
    headers: {
      'authorization': '88c55c89'
    }
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    console.log(body)


    if (err) {
      res.json(err)
    } else {
      res.send(body)

    }
  });
}


module.exports.SearchData = async (req, res) => {
  const doId=req.params.doId;
  const {authKey,searchkey} = req.body;
  const options = {
    url: searchApi,
    qs: { id: doId,searchkey:searchkey,type:'p'},
    json: true,
    headers: {
      'authorization': authKey
    },
  }
  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
     console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}

module.exports.customerSearchApi = async (req, res) => {
  const doId=req.params.doId;
  const {authKey,searchkey} = req.body;
  const options = {
    url: customerSearchApi,
    qs: { id:doId,searchkey:searchkey,type:'c'},
    json: true,
    headers: {
      'authorization': authKey
    },
  }
  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
     console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}

module.exports.getprospectsCustomers = async (req, res) => {
  const {authKey,type}=req.body;
  console.log(authKey,type)
  const options = {
    url: fetchProspectsdataApi,
    qs: { id: 'c61f0294b6c8', type: type },
    json: true,
    headers: {
      'authorization': authKey
    }
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });
}
