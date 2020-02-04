const arrayEqual = require('array-equal')
const dateServices = require('./date.services')
const questionServices = require('./question.services')

module.exports = {
    summaryForArray,
    trimAverages,
    returnTrend
}

function summaryForArray(qsetArr) {
    if (qsetArr.length === 0) {
        throw {
            error: false,
            message: "No results yet!"
        }
    }

    let numOfValidSet = qsetArr.length
    const setOfSummary = []
    let resultSummary
    const averageSums = []

    qsetArr.map((qset) => {
        if (qset.summary){
            setOfSummary.push(qset.summary)
        }
        else {
            numOfValidSet --
        }
    })
    if (numOfValidSet < 1) {
        throw {
            error: false,
            message: "No results yet!"
        }
    }

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
        resultSummary.averages[i] = averageSums[i] / numOfValidSet
    }

    return resultSummary
}

function trimAverages(summary) {
    summary.averages = summary.averages.map(average => average.toFixed(2))

    return summary
}


//This function ***requires*** the questionSet to have 3 measures
async function returnTrend(qsetArr) {
    const days = dateServices.daysThisWeek()
    try {
        const data = days.map((day, index) => {
            const dayString = day.toLocaleString('en-us', {  weekday: 'short' })
            return {
                day: dayString,
                [qsetArr[index].summary.measures[0]]: qsetArr[index].summary.averages[0],
                [qsetArr[index].summary.measures[1]]: qsetArr[index].summary.averages[1],
                [qsetArr[index].summary.measures[2]]: qsetArr[index].summary.averages[2],
            }
        })
        return data
    }
    catch(err){
        throw err
    }
}

