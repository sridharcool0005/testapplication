const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
// Define Schema
let folderSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },

  folderName: {
    type: String,
    required:true
  },
  agentId:{
    type:String,


  },
  doId:{
    type:String,


  }
},
  {
    timestamps: true
  },
  {
    collection: 'folderNames'
  })

module.exports = mongoose.model('folderNames', folderSchema)
