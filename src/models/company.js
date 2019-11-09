var mongoose = require('mongoose')

const Company = mongoose.Schema({
    name: String,
    industry: String,
    subscription: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    questions: [
        {
            question: String,
            type: String,
        }
    ],
    lastUpdated: Date
})

module.exports = mongoose.model('Company', Company)