const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const doSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
        auto: true
    },
    doId: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    whatsapp: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
}, {
    collection: 'admin',
    timestamps: true
    });

const admin = mongoose.model('Do', doSchema);
module.exports = admin;