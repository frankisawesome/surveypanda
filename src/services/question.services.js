const QuestionSet = require('../models/questionSet')
const companyServices = require('./company.services')
const searchServices = require('./search.services')

module.exports = {
    create,
    find,
    updateAnswers,
    findWeek
}

//find a questionnare for a particular company on a given day
function find(name, date) {
    let upper, lower;
    try {
        upper = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        lower = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    catch(err) {
        throw err
    }

    const query = QuestionSet.find({ companyName: name, date: { $lte: upper, $gte: lower } })

    return query.exec()
}


//start date
function findWeek(name, date){
    let upper, low;
    try {
        upper = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        lower = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    catch (err) {
        throw err
    }

    const query = QuestionSet.find( { companyName: name, date: { $lte: upper, $gte: lower}})

    return query.exec()
}

async function create(name) {
    //find the company document by name
    try {
        //get the company profile
        let companyArr = await companyServices.find(name)
        const company = companyArr[0]
        const newSet = new QuestionSet({
            companyName: name,
            questions: []
        })
        company.questions.map((question) => {
            const newq = {
                text: question.text,
                measures: question.measures,
                results: []
            }

            newSet.questions.push(newq)
        })
        return newSet.save()
    }
    catch (err) {
        throw err;
    }
}

async function updateAnswers(name, date, answers) {
    try {
        let qArr = await find(name, date)
        if (qArr.length === 0) {
            throw {
                error: true,
                message: 'The questionnaire does not exist yet!'
            }
        }
        
        const qset = qArr[0]
        if (answers.length !== qset.questions.length) {
            throw {
                error: true,
                message: "Answer number not equal to questions count!"
            }
        }
        

        else {
            answers.map((answer, i) => {
                qset.questions[i].results.push(answer)
            })
            const summary = searchServices.summary(qset)
            qset.summary = summary
            return qset.save()
        }
    }
    catch (err) {
        throw err;
    }
}
