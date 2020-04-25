var mongoose = require('mongoose')

const Company = mongoose.Schema({
    name: { 
        type:String,
        unique:true
    },
    nameid: {
        type:String,
        unique: true
    },
    industry: String,
    subscription: String,
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    questions: {
        type: [
            {
                text: String,
                measures: String
            }
        ],
        default: [
            { text: "How did you find the shift overall?", measures: "Shift Sentiment"},
            { text: "Did the shift have a good work load?", measures: "Workload Perception"},
            { text: "Did you feel supported with your work during the shift?", measures: "Support Factor"},
        ]
    },
    lastUpdated: Date,
    users: [
        String
    ]
})

module.exports = mongoose.model('Company', Company)