const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
// Define Schema
let smsSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },

  folderName: {
    type: String,
    required:true
  },

  doId:{
    type:String,
    required:true
  },
},
  {
    timestamps: true
  },
  {
    collection: 'smsFolders'
  })

module.exports = mongoose.model('smsFolders', smsSchema)
