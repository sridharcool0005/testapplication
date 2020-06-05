const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  doId: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String,
    required: true
  },
  title: {
    type: String,

  },
  Source: {
    type: String,

  },
  date: {
    type: String,

  },
  Category: {
    type: String,

  },
  description: {
    type: String,

  },
  status: {
    type: String,
    enum: ['NEW', 'APPROVE', 'DENY']
  },


}, {
  collection: 'PdfFiles'
})

module.exports = mongoose.model('Notice', userSchema)
