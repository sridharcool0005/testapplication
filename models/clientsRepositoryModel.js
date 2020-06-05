const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
// Define Schema
let userSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },

  fullName: {
    type: String,
    required: true
  },
  agentId: {
    type: String,
  },
  doId: {
    type: String
  },
  email: {
    type: String,
  },
  whatsaap: {
    type: Number,
  },
  mobile: {
    type: Number
  },
  avatar: {
    type: String,
  },

  folderName: {
    type: String,
    required:true
  },
  notes: {
    type: String
  }


},
  {
    timestamps: true
  },
  {
    collection: 'clientRepository'
  })

module.exports = mongoose.model('clientRepository', userSchema)
