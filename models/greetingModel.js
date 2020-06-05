const mongoose = require('mongoose');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
// Define Schema
let greetingschema = new Schema({
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
    collection: 'greetingsFolders'
  })

module.exports = mongoose.model('greetingsFolders', greetingschema)
