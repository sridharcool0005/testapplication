const mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const transactionSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true
    },
    agentId: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    finYear: {
        type: Number,
        required: true
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

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;