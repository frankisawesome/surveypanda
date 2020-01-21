const QuestionSet = require('../models/questionSet')
const companyServices = require('./company.services')
const searchServices = require('./search.services')
const dateServices = require('./date.services')


module.exports = {
    create,
    find,
    updateAnswers,
    findWeek,
    createIfNotFound
}

//find a questionnare for a particular company on a given day
function find(id, date) {
    const [upper, lower] = dateServices.intervalDay(date)
    
    const query = QuestionSet.find({ companyId: id, date: { $lte: upper, $gte: lower } })

    return query
}


//start date
function findWeek(id, date){
    const [upper, lower] = dateServices.intervalWeek(date)
    
    const query = QuestionSet.find( { companyId: id, date: { $lte: upper, $gte: lower}})

    return query
}

async function create(id, date) {
    //find the company document by name
    try {
        //get the company profile
        let companyArr = await companyServices.find(id)
        const company = companyArr[0]
        const newSet = new QuestionSet({
            companyId: id,
            questions: [],
            date: date
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

async function updateAnswers(id, date, answers) {
    try {
        let qArr = await find(id, date)
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
            qset.summarise()
            return qset.save()
        }
    }
    catch (err) {
        throw err;
    }
}

//create questionnaire if not found for a particular company on a particular day
async function createIfNotFound(date, id) {
    try {
        //find if questionnare exists
        const result = await find(id, date)
        if (result.length === 0) {
            return await create(id, date)
        }
        else {
            return result[0]
        }
    }
    catch(err) {
        throw {
            error: true,
            message: err.message
        }
    }
}
