const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const greetingSchema = mongoose.Schema({

  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },

  agentId: {
    type: String,
    required: true
  },
  occassion: {
    type: String,
    required: true
  },
  emailsArr:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  }
},
{
  collection: 'agentGreetings',
  timestamps: true
})


const greetings = mongoose.model('greetings', greetingSchema);
module.exports = greetings;
