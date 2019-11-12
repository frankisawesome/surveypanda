const Company = require('../models/company')

module.exports = {
    parse,
    create
}

function parse (req, res, next) {
    const post = new Company({
        name: req.body.name,
        industry: req.body.industry,
        subscription: req.body.subscription,
        dateCreated: Date.now(),
        questions: "default",
        lastUpdated: Date.now()
    })

    req.payload = post;

    next();
}

async function create(company) {
    if (await Company.findOne({name: company.name})){
        throw `Company ${company.name} already exists`
    }

    await company.save()
}