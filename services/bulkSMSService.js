const request = require('request');
var http = require("https");
smsApi = 'https://agentapp.fundguard.in/getSMSPackages.php?id=bfa43406&sales_channel=agentplus';
PackDetailsApi = 'https://agentapp.fundguard.in/getSMSPackageDetails.php?id=bfa43406'
checkBalance = 'https://api.msg91.com/api/balance.php';
addNewClient = 'https://api.msg91.com/api/add_client.php';
smsCreditAPI = 'https://api.msg91.com/api/credit_history.php';
TransHistoryAPI = 'https://www.nutansms.nutantek.com/clients/getTransactionHistory.php';
smsPackAPI = 'https://www.nutansms.nutantek.com/clients/getActivePackagesSummary.php';
offlinePayApi = 'https://www.nutansms.nutantek.com/clients/getPaymentChannels.php';
orderIdApi = 'https://www.nutansms.nutantek.com/clients/getOrderID.php';
postPaymentTransactionApi = 'https://www.nutansms.nutantek.com/clients/postPaymentTransaction.php';
DlrSummary = 'https://www.nutansms.nutantek.com/clients/getDLRSummary.php';
DlrDetailed = 'https://www.nutansms.nutantek.com/clients/getDLRDetailed.php';
PieChartApi = 'https://www.nutansms.nutantek.com/clients/getDLRDashboard.php';
GetCouponAmt = 'https://www.nutansms.nutantek.com/clients/getCoupons.php';
NotificationsCount = 'https://www.nutansms.nutantek.com/clients/showNotificationsCount.php';
NotificationDetails = 'https://www.nutansms.nutantek.com/clients/showNotificationsDetails.php';
const getGatewaydataAPI="https://www.nutansms.nutantek.com/clients/getGatewaydata.php"
const User = require('../models/user');


module.exports.callApi = async (req, res) => {
  if (req.headers) {
    var authHeader = req.headers.authorization;
  }
  const options = {
    url: smsApi,
    json: true,
    headers: {
      'authorization': 'bc19edd3'
    }
  }

  request(options, (err, response, body) => {
    if (err) {
      res.json(err)
    } else {
      res.json(body)
      console.log(authHeader, 'headers');
    }
  });
}

module.exports.getGatewaydataAPI = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id

    console.log(doId, authkey)
    const options = {
      url: getGatewaydataAPI,
      qs: { client_id: doId },

      headers: {
        'Authorization': authkey
      },
      json: true,
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

module.exports.sendSMS = async (req, res) => {

  const { mobile, message,authkey } = req.body;
  console.log(mobile, message);
  var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v2/sendsms",
    "headers": {
      "authkey": authkey,
      "content-type": "application/json"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({
    sender: 'SOCKET',
    route: '4',
    country: '91',
    sms:
      [{ message: message, to: [mobile] }

      ]
  }));
  req.end();
}

module.exports.getsmspackDetails = async (req, res) => {
  const { package_id } = req.body;
  console.log(package_id, 'details');
  const options = {
    package_id: package_id,
    url: PackDetailsApi,
    qs: { package_id: package_id },
    json: true,
    headers: {
      'authorization': 'bc19edd3'
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


module.exports.checkBalance = async (req, res) => {
  authkey = '322657AFCLZKVyU8tq5e72f821';
  type = '4';
  const options = {
    url: checkBalance,
    qs: { authkey: authkey, type: type },
    json: true,

  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    // console.log(body)

    if (err) {
      res.json(err)
    } else {
      const balance = body
      console.log(balance)
      const data = { balance: balance }
      res.json(data)

    }
  });
}


module.exports.getSMSCreditHistory = async (req, res) => {
  var { authkey } = req.body;
  var options = {
    url: smsCreditAPI,
    qs: {
      authkey: authkey
    },
    json: true,
  };

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


module.exports.getTransactionHistory = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
    const { from_date, to_date } = req.body;
    console.log(doId, authkey)
    const options = {
      url: TransHistoryAPI,
      qs: { client_id: doId },
      body: {
        from_date: from_date,
        to_date: to_date
      },
      headers: {
        'Authorization': authkey
      },
      method: 'POST',

      json: true,
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


module.exports.getActivePack = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
    const options = {
      url: smsPackAPI,
      qs: { client_id: doId },
      headers: {
        'Authorization': authkey
      },
      json: true,
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

module.exports.getOfflinepayment = async (req, res) => {

  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 })
    .then(result => {

      const authkey = result[0]._id
      const options = {
        url: offlinePayApi,
        qs: { client_id: doId },
        headers: {
          'Authorization': authkey
        },
        json: true,
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

module.exports.getOrderId = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { package_id, txn_date, package_price, coupon_id, coupon_amount, gst_amount, total_amount_paid } = req.body;
  const options = {
    url: orderIdApi,
    qs: { client_id: doId, sales_channel: 'agentplus' },
    headers: {
      'Authorization':authkey
    },
    body: {
      package_id: package_id,
      txn_date: txn_date,
      package_price: package_price,
      coupon_id: coupon_id,
      coupon_amount: coupon_amount,
      gst_amount: gst_amount,
      total_amount_paid: total_amount_paid

    },
    json: true,
    method: 'PUT',
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



module.exports.postPaymentTransaction = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
    console.log(authkey)
  const { order_id, payment_mode, payment_gateway_txn_ref, notes ,payment_gateway_txn_id} = req.body;
  console.log(order_id,payment_gateway_txn_id)
  const options = {
    url: postPaymentTransactionApi,
    qs: { client_id: doId },
    body: {
      order_id: order_id,
      payment_mode: payment_mode,
      payment_gateway_txn_ref: payment_gateway_txn_ref,
      payment_status_code: "success",
      payment_gateway_txn_id: payment_gateway_txn_id,
      notes: notes
    },
    headers: {
      'Authorization': authkey
    },
    method: 'POST',

    json: true,
  }
  console.log(options)
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


module.exports.DlrSummary = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { from_date, to_date } = req.body;

  const options = {
    url: DlrSummary,
    qs: { client_id: doId, from_date: from_date, to_date: to_date },

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
  console.log(options)
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


module.exports.DlrDetailed = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { from_date, to_date } = req.body;

  const options = {
    url: DlrDetailed,
    qs: { client_id: doId, from_date: from_date, to_date: to_date },

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
  console.log(options)
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

module.exports.getPieChartApidata = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { from_date, to_date } = req.body;

  const options = {
    url: PieChartApi,
    qs: { client_id: doId, from_date: from_date, to_date: to_date },

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
  console.log(options)
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


module.exports.GetCouponAmt = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const { package_price } = req.body;

  const options = {
    url: GetCouponAmt,
    qs: { client_id: doId, sales_channel: "agentplus", package_price: package_price },

    headers: {
      'Authorization': authkey
    },
    method: 'GET',

    json: true,
  }
  console.log(options)
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


module.exports.NotificationsCount = async (req, res) => {
  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const options = {
    url: NotificationsCount,
    qs: { client_id: doId },
    headers: {
      'Authorization': authkey
    },


    json: true,
  }
  console.log(options)
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


module.exports.NotificationsDetails = async (req, res) => {

  const doId = req.params.doId;
  User.find({ doId: doId }, { _id: 1 }).then(result => {

    const authkey = result[0]._id
  const options = {
    url: NotificationDetails,
    qs: { client_id: doId },
    headers: {
      'Authorization': authkey
    },


    json: true,
  }
  console.log(options)
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
