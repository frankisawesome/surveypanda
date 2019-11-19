const QuestionSet = require('../models/questionSet')
const companyServices = require('../services/company.services')

module.exports = {
    create,
    find
}

//find a questionnare for a particular company on a given day
async function find(name, date){
    const upper = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
    const lower = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const query = QuestionSet.find({ companyName: name, date: { $lte: upper, $gte: lower}})

    return query.exec()
}

async function create(name){
    //find the company document by name
    let company;
    companyServices.find(name)
    .then((doc) => {
        const newSet = new QuestionSet({
            companyName: name,
            questions: []
        })
        company = doc[0]
        company.questions.map((question) => {
            const newq = {
                text: question.text,
                measures: question.measures,
                results: []
            }
            
            newSet.questions.push(newq)
        })
        return newSet.save()
    })
    .catch((err) => {
        throw err;
    })
}