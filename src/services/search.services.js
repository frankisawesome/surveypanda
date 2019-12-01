const QuestionSet = require('../models/questionSet')

module.exports = {
    summary
}

//returns a summary statistics object of a given questionSet object
//returns js object { measures:[], averages:[] }
function summary(qset) {
    const summary = {
        measures: [],
        averages: []
    }
    qset.questions.map((question) => {
        let sum = 0;
        let count = 0;
        question.results.map((result) => {
            sum += result;
            count++;
        })
        summary.averages.push(sum / count)
        summary.measures.push(question.measures)
    })
    return summary
}

