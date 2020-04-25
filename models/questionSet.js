var mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        text: { type: String, required: true },
        results: [Number], //storing number answers, such as 1-5 scales
        measures: String //records what the question measures
    })

//Each company will have a questionSet document for every day, containing the questions on that day and their answers.
const questionSetSchema = mongoose.Schema({
    date: { type: Date, default: Date.now() },
    companyId: { type: String, required: true },
    questions: {
        type: [questionSchema]
    },
    feedback: {
        type: [String]
    },
    summary: {
        type: {
            measures: [String],
            averages: [Number]
        },
        default: {
            measures: ["Shift Sentiment", "Workload Perception", "Support Factor"],
            averages: [0, 0, 0]
        }
    }
})

//method for finding the average of a certain question
questionSchema.methods.findAverage = function() {
    let sum = 0;
    let count = 0;
    this.results.map((result) => {
        sum += result;
        count++;
    })
    return [sum / count, this.measures]
}

//methods for summarising a question set
// *** NOT EFFICIENT *** //
questionSetSchema.methods.summarise = function() {
    const summary = {
        measures: [],
        averages: []
    }
    this.questions.map((question) => {
        const [average, measure] = question.findAverage()
        summary.averages.push(average)
        summary.measures.push(measure)
    })
    this.summary = summary
}


module.exports = mongoose.model('QuestionSet', questionSetSchema)