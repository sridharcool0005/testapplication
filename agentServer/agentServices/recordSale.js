
const RecordModel = require('../agentModels/recordSaleModel');
const DoModel = require("../../models/user");


module.exports.recordSale = async (req, res) => {
  const {agentId , doId} = req.params;
  const { no_SP, amtSP, no_NSP, amtNSP, month } = req.body;
console.log(req.body);

return DoModel.findOne({doId : doId})
.then(doResult => {
  var currentFinYear = doResult.currentFinYear;
  year = Number(currentFinYear.split("-")[1]);
  console.log(year);

  var query = {}, update = { no_SP: no_SP, amtSP: amtSP, no_NSP: no_NSP, amtNSP, amtNSP: amtNSP };
    console.log("else..", agentId);
    query.agentId = agentId;
    query.doId = doId;
    query.finYear = year;
    query.month = month,

    console.log("query===", query);
    return RecordModel.update(query, { $set: update}, {upsert: true, setDefaultsOnInsert: true, multi: true})
    .then((result) => {
      console.log("result===", result);
      res.send({message : "Success"});
    }).catch(err=> {
      console.log(err);
      res.status(500).send({message : "Failed", error: err});
    });



});
  // const record = new recordModel({
  //   no_SP: no_SP,
  //   amtSP: amtSP,
  //   no_NSP: no_NSP,
  //   amtNSP: amtNSP,
  //   finYear: finYear,
  //   agentId:agentId,
  //   doId : doId

  // });

  // return await record.save()
  //   .then((result) => {
  //     res.send({ success: true, message: 'record updated success' });
  //   })
  //   .catch((err) => {
  //     console.log('err in setting records', err);
  //     res.status(400).send({ success: false, message: err.message })
  //   });
};


module.exports.fetchRecordsales = async (req, res) => {
  const {agentId , doId} = req.params;
  console.log(agentId, doId);

  RecordModel.find({ doId: doId, agentId : agentId }, (error, targets) => {
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
