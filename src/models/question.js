var mongoose = require('mongoose')

const schema = mongoose.Schema({
    companyId: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true },
    num_results: [Number], //storing number answers, such as 1-5 scales
    scale: Number, //records the scale the question results are in
    text_results: [String], //records text answers if applicable
    measures: String //records what the question measures
})

module.exports = mongoose.model('Question', schema)