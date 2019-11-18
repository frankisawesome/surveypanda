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

    await company.save()
}

//Find company by name
async function find(name) {
    var query = Company.find({ name: name })
    return query.exec()
}

async function updateQuestion(questions, measures, name) {

}
