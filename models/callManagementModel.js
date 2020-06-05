const mongoose = require('mongoose');

let callManageSchema = new mongoose.Schema({

  doId: {
    type: String,
    required: true
  },

  fullName: {
    type: String,
    required: true
  },
  email:{
    unique:true,
    type:String,

  },
  mobile: {
   unique: true,

    type: Number,
    required: true,

  },
  whatsapp: {
    unique:true,
    type: Number,

  },
  pinCode: {
    type: Number,


  },
  city: {
    type: String,

  },
  address: {
    type: String,
  },

  status: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  folderName: {
    type: String,
    required: true
  },

}, {
  collection: 'CallData',
  timestamps: true
})

module.exports = mongoose.model('CallData', callManageSchema)
