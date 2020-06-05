const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let materialSchema = new Schema({
  _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true
    },
  email: {
      type: String,
      unique: true,
      required: true
  },
  token: {
    type: String,
    required: true
  }
}, {
    timestamps: true
  })

module.exports = mongoose.model('forgotPassword', materialSchema)
