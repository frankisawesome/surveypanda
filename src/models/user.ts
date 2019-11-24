const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    username: {
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
    lastSurvey: Date,
    //For future incentive feature, e.g. : { name: "muffin point", score: 5 }
    incentive: {
        name: String,
        score: {
            type: Number,
            default: 0
        }
    }
})

export = mongoose.model('User', user)