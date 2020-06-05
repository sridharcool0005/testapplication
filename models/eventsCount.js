const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let eventSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },
  doId: {
    type: String,
  },
  call: {
    type: String,
  },
  sms: {
    type: String
  },
  whatsaap: {
    type: String
  }
},
  {
    timestamps: true
  },
  {
    collection: 'calleventsCount'
  })

module.exports = mongoose.model('calleventsCount', eventSchema)
