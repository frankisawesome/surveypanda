var mongoose = require('mongoose')

const schema = mongoose.Schema({
    companyName: { type: String, required: true },
    text: { type: String, required: true },
    num_results: [Number], //storing number answers, such as 1-5 scales
    measures: String //records what the question measures
})

module.exports = mongoose.model('Question', schema)