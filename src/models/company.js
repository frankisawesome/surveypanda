var mongoose = require('mongoose')

const Company = mongoose.Schema({
    name: { 
        type:String,
        unique:true
    },
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
    lastUpdated: Date,
    users: [
        String
    ]
})

module.exports = mongoose.model('Company', Company)