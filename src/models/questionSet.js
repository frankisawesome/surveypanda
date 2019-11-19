var mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    text: { type: String, required: true },
    results: [Number], //storing number answers, such as 1-5 scales
    measures: String //records what the question measures
})

//Each company will have a questionSet document for every day, containing the questions on that day and their answers.
const questionSetSchema = mongoose.Schema({
    date: {type: Date, default: Date.now()},
    companyName: {type:String, required: true},
    questionCount: Number,
    questions: [questionSchema]
})

module.exports = mongoose.model('QuestionSet', questionSetSchema)