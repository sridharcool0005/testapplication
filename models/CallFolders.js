const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

let CallDataSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
    auto: true
  },

  folderName: {
    unique:true,
    type: String,
    required:true
  },

  doId:{
    type:String,
  }
},
  {
    timestamps: true
  },
  {
    collection: 'callDatafolders'
  })

module.exports = mongoose.model('callDatafolders', CallDataSchema)
