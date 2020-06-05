const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let materialSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  agentId:{
    type:String,

  },
  doId:{
    type:String,
  },
  avatar: {
    type: String,
    required:true
  },
  title: {
    type: String,

    },
    Source: {
      type: String,

    },
    date:{
      type:String,

    },
    Category:{
      type:String,

    },
    description:{
      type:String,

    },
    status: {
      type: String,
      enum: ['NEW', 'APPROVE', 'DENY']
    },


}, {
    collection: 'materials'
  })

module.exports = mongoose.model('learningMaterial', materialSchema)
