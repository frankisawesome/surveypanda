const arrayEqual = require('array-equal')

module.exports = {
    summaryForArray,
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

