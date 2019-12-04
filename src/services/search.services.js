const arrayEqual = require('array-equal')

module.exports = {
    summary,
    summaryForArray
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

function summaryForArray(qsetArr) {
    if (qsetArr.length === 0) {
        throw {
            error: true,
            message: "Can't find requested set of questionnaires, could be: 1. the questionnaire does not exist 2. request body error, check that you have a correct name field in your request body, and a correct week value"
        }
    }

    const numOfSet = qsetArr.length
    const setOfSummary = []
    let resultSummary
    const averageSums = []

    qsetArr.map((qset) => {
        setOfSummary.push(qset.summary)
    })

    setOfSummary.map((sum, i) => {
        if (i == 0) {
            resultSummary = {
                measures: sum.measures,
                averages: []
            }
            sum.averages.map((average) => {
                averageSums.push(average)
            })
        }
        else {
            if (!arrayEqual(sum.measures, resultSummary.measures)) {
                throw {
                    error: true,
                    message: "Changes have been made to your measuring metrics in the past week, try again next week!"
                }
            }
            else {
                sum.averages.map((average, j) => {
                    averageSums[j] += average
                })
            }
        }
    })
    for (i = 0; i < averageSums.length; i++) {
        resultSummary.averages[i] = averageSums[i] / numOfSet
    }

    return resultSummary
}

