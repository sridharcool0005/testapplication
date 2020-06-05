const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userSchema = new Schema({
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
    description:{
      type:String,

    },
    Category:{
      type:String,
    },
    status: {
      type: String,
      required: true,
      enum: ['NEW', 'APPROVE', 'DENY']
    },

}, {
    collection: 'contribution'
  })

module.exports = mongoose.model('contribution', userSchema)
