var mongoose = require('mongoose')

const schema = mongoose.Schema({
    text: { type: String, required: true },
    results: [Number], //storing number answers, such as 1-5 scales
    measures: String //records what the question measures
})

module.exports = mongoose.model('Question', schema)