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
    description:{
      type:String,

    },
    Category:{
      type:String,
    }


},
{
  timestamps: true
},
{
    collection: 'personalRepository'
  })

module.exports = mongoose.model('personalRepository', userSchema)
