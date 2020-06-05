const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const recordSchema = mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },
  agentId: {
    type: String,
    required: true
  },
  doId: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true,
    enum: ["January","February","March","April","May","June","July","August","September","October","November","December"]
  },
  finYear: {
    type: Number,
    required: true,
  },
  no_SP: {
    type: Number,
    required: true
  },
  amtSP: {
    type: Number,
    required: true
  },
  no_NSP: {
    type: Number,
    required: true
  },
  amtNSP: {
    type: Number,
    required: true
  },


},
  {
    collection: 'recordSales',
    timestamps: true
  });

// composite keys
recordSchema.index({ agentId: 1, doId: 1, month: 1, finYear: 1 ,_id:1}, { unique: true })

const record = mongoose.model('record', recordSchema);
module.exports = record;
