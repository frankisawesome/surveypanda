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
            question: { type:String, required:true },
            answerType: { type:String, default: "numeric" }, //should be either numeric or text
            measures: { type:String, default: ""} 
        }
    ],
    lastUpdated: Date,
    users: [
        String
    ]
})

module.exports = mongoose.model('Company', Company)