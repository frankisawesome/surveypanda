var mongoose = require('mongoose')

const Survey = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    music: {
        type: Number,
        required: true
    },
    stress: {
        type: Number,
        required: true
    },
    cleanliness: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Survey', Survey)