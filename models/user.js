const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: String,
    createdDate: {
        type: Date,
        default: Date.now()
    },
    group: {
        type: String,
        default: "employer"
    },
    companyId: {
        type: String,
        required: true
    },
    verified: { type: Boolean, default: false}
})

module.exports = mongoose.model('User', user)