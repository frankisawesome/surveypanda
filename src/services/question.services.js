const Question = require('../models/question')
const companyServices = require('../services/company.services')

module.exports = {
    create,
    find
}

//find a questionnare for a particular company on the current day
function find(name){
    
}

async function create(name){
    //find the company document by name
    let company;
    companyServices.find(name)
    .then((doc) => {company = doc})
    .catch((err) => {
        throw err;
    })

    const question = new Question({
        companyName: company.name,
        
    })
}