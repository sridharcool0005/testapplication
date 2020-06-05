const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const targetSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true
    },
    doId: {
        type: String,
        required:true
    },
    agentId: {
        unique: true,
        type: String,
        required:true

    },
    finYear: {
        type:Number,
        required: true,
    },
    no_SP: {
        type: Number,
        required: true
    },
    amtSP: {
        type: Number,
        required: true
    },
    no_NSP: {
        type: Number,
        required: true
    },
    amtNSP: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
  });

const Target = mongoose.model('Target', targetSchema);
module.exports = Target;
