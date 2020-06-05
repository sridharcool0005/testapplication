const recordModel = require('../agentServer/agentModels/recordSaleModel');
const TargetModel = require('../models/target.model');
const ObjectId = require('mongodb').ObjectID;


module.exports.fetchDoRecordsales = async (req, res) => {
  const { doId } = req.params;

  recordModel.find({ doId: doId }, (error, targets) => {
    if (error)
      return error;

    var no_SPSum = 0;
    var amtSPSum = 0;
    var no_NSPSum = 0;
    var amtNSPSum = 0;
    targets.forEach(target => {
      no_SPSum += target.no_SP;
      no_NSPSum += target.no_NSP;
      amtSPSum += target.amtSP;
      amtNSPSum += target.amtNSP
    });
    var output = {
      no_SPSum: no_SPSum,
      amtSPSum: amtSPSum,
      no_NSPSum: no_NSPSum,
      amtNSPSum: amtNSPSum
    }
    res.json(output);
  })

};

module.exports.fetchAgentRecordsales = async (req, res) => {
  const { doId } = req.params;
  const { agentId } = req.body;
  var query = { doId: doId, agentId: agentId };

  recordModel.find(query, { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1 }, (error, targets) => {
    if (error)
      return error;

    var no_SPSum = 0;
    var amtSPSum = 0;
    var no_NSPSum = 0;
    var amtNSPSum = 0;
    targets.forEach(target => {
      no_SPSum += target.no_SP;
      no_NSPSum += target.no_NSP;
      amtSPSum += target.amtSP;
      amtNSPSum += target.amtNSP
    });
    var output = {
      no_SPSum: no_SPSum,
      amtSPSum: amtSPSum,
      no_NSPSum: no_NSPSum,
      amtNSPSum: amtNSPSum
    }
    res.json(output);
  })

};
module.exports.agentSingleRecordsales = async (req, res) => {
  const { doId } = req.params;
  const { agentId, year } = req.body;
  var query = { doId: doId, agentId: agentId, finYear: year };

  TargetModel.findOne(query).then(target => {
    console.log(target);
    recordModel.find(query, { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1, finYear: 1, month: 1 }, (error, records) => {
      if (error)
        return error;

      var resultsArr = [];
      var sum_no_Sp = 0;
      var sum_no_NSP = 0;
      var sum_amtSP = 0;
      var sum_amtNSP = 0;
      records.forEach(record => {
        var result = {};
        result.agentId = record.agentId;
        result.no_SP = record.no_SP;
        result.amtSP = record.amtSP;
        result.no_NSP = record.no_NSP;
        result.amtNSP = record.amtNSP;
        result.finYear = record.finYear;
        result.month = record.month;

        sum_no_Sp += record.no_SP;
        sum_amtSP += record.amtSP;
        sum_no_NSP += record.no_NSP;
        sum_amtNSP += record.amtNSP;

        record.perc_no_SP = (sum_no_Sp / target.no_SP) * 100;
        result.perc_no_SP = record.perc_no_SP;

        record.perc_amtSP = (sum_amtSP / target.amtSP) * 100;
        result.perc_amtSP = record.perc_amtSP;

        record.perc_no_NSP = (sum_no_NSP / target.no_NSP) * 100;
        result.perc_no_NSP = record.perc_no_NSP;

        record.perc_amtNSP = (sum_amtNSP / target.amtNSP) * 100;
        result.perc_amtNSP = record.perc_amtNSP;

        resultsArr.push(result);
        console.log("recorsss...", result, result.per_no_SP);
      })

      console.log(resultsArr);
      res.json(resultsArr);
    })

  });


};
module.exports.agentAllRecordsales = async (req, res) => {
  const { doId, year } = req.params;
  query = {};
  var query = { doId: doId, finYear: year };


  TargetModel.find(query, { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1, finYear: 1 })
    .then(targets => {
      var agentIds = [];
      targets.forEach(target => {
        agentIds.push(target.agentId);

      });
      // });
      console.log(agentIds)
      return recordModel.find({ agentId: { $in: agentIds } }, { agentId: 1, no_SP: 1, amtSP: 1, no_NSP: 1, amtNSP: 1, finYear: 1, month: 1 }, { multi: true }).then(records => {

        var resultsArr = [];
        var sum_no_Sp = 0;
        var sum_no_NSP = 0;
        var sum_amtSP = 0;
        var sum_amtNSP = 0;
        records.forEach(agentRecord => {


          targets.forEach(target => {

            if (target.agentId === agentRecord.agentId) {
              console.log(target.agentId, '-', agentRecord.agentId);
              var result = {};
              result.agentId = agentRecord.agentId;
              result.no_SP = agentRecord.no_SP;
              result.amtSP = agentRecord.amtSP;
              result.no_NSP = agentRecord.no_NSP;
              result.amtNSP = agentRecord.amtNSP;
              result.finYear = agentRecord.finYear;
              result.month = agentRecord.month;

              sum_no_Sp += agentRecord.no_SP;
              sum_amtSP += agentRecord.amtSP;
              sum_no_NSP += agentRecord.no_NSP;
              sum_amtNSP += agentRecord.amtNSP;


              agentRecord.perc_no_SP = (sum_no_Sp / target.no_SP) * 100;
              result.perc_no_SP = agentRecord.perc_no_SP;

              agentRecord.perc_amtSP = (sum_amtSP / target.amtSP) * 100;
              result.perc_amtSP = agentRecord.perc_amtSP;

              agentRecord.perc_no_NSP = (sum_no_NSP / target.no_NSP) * 100;
              result.perc_no_NSP = agentRecord.perc_no_NSP;

              agentRecord.perc_amtNSP = (sum_amtNSP / target.amtNSP) * 100;
              result.perc_amtNSP = agentRecord.perc_amtNSP;

              resultsArr.push(result);
            }
          });
        });
        res.json(resultsArr);
        //  res.send({ records: resultsArr });
      });
    })
};


module.exports.updateRecordSales = (req, res) => {

  var { agentId, no_SP, amtSP, no_NSP, amtNSP, finYear, month } = req.body;
  var query = { agentId: agentId };
  console.log(query)
  const newvalues = { $set: { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP: amtNSP, finYear, month } };
  recordModel.findOneAndUpdate(query, newvalues, { new: true })
    .then(agent => {
      console.log(agent);
      res.send({ agent: agent, message: "success" });
    })
    .catch((err) => {
      console.log('err in statement', err);
      res.status(400).send({ success: false, message: err.message })
    });

}


module.exports.UploadTargets = async (req, res) => {
  const doId = req.params.doId;
  const finYear = req.params.finYear;
  const { data } = req.body;
  var promiseSaveArr = [];
  data.forEach(obj => {
    const XlFile = new recordModel({
      doId: doId,
      agentId: obj.agentId,
      name:obj.name,
      month: obj.month,
      no_SP: obj.no_SP,
      amtSP: obj.amtSP,
      no_NSP: obj.no_NSP,
      amtNSP: obj.amtNSP,
      finYear :finYear
    });
    promiseSaveArr.push(XlFile.save());
  });
  return await Promise.all(promiseSaveArr).then(result => {
    res.send({ success: true, message: 'Upload success' });
  }).catch((err) => {
    console.log('err in recordsale service ', err);
    res.status(400).send({ success: false, message: err.message })
  });

};


module.exports.getAgentRecords=function (req,res){
  var doId =req.params.doId;
  var finYear=req.params.finYear;

  recordModel.find({ doId: doId,finYear:finYear }, { __v: 0 })
  .then(agents => {
    res.status(200).send(agents);
  });


}
