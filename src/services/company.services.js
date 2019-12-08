//business logics for the company schema
const Company = require('../models/company')

module.exports = {
    parse,
    create,
    updateQuestion,
    find
}

//middleware that parses a request body into a new company object, attached to the req object as req.payload
function parse (req, res, next) {
    const post = new Company({
        name: req.body.name,
        nameid: req.body.name.replace(/\s+/g, '').toLowerCase(),
        industry: req.body.industry,
        subscription: req.body.subscription,
        dateCreated: Date.now(),
        lastUpdated: Date.now()
    })

    req.payload = post;

    next();
}

//Creates a new company
async function create(company) {
    if (await Company.findOne({name: company.name})){
        throw `Company ${company.name} already exists`
    }

    var query = company.save()
    return query
}

//Find company by nameid
async function find(nameid) {
    var query = Company.find({ nameid: nameid })
    return query
}

//Update arrays of question and measure
async function updateQuestion(questions, measures, name) {
    const payload = [];
    questions.map((question, i) => {
        qobj = {
            text: question,
            measures: measures[i]
        }
        payload.push(qobj)
    })
    var query = Company.findOneAndUpdate( {name: name} , { $set: { questions: payload}})

    return query
}
