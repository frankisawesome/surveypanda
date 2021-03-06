var Router = require('express');
var router = Router();
const companyServices = require('../services/company.services')

//API endpoints
router.get('/', greet)
router.get('/find', find)

router.post('/new', companyServices.parse, create)
router.post('/update', update)


//Controller functionss
function greet(req, res) {
    res.send('Company API')
}

function create (req, res) {
    companyServices.create(req.payload)
    .then((doc) => {
        res.status(201)
        res.json({message: 'Successfully created new company', document: doc})
    })
    .catch((err) => {
        console.log(err)
        res.status(400)
        res.json(err)
    })
}

function find(req, res) {
    if (req.body.id == undefined) {
        res.send('include id in your request body! it will be the company name all lowercased and no space')
    }
    companyServices.find(req.body.id)
    .then((company) => {
        if (company.length === 0) {
            res.send('Could not find specified company!')
        }
        res.send(company[0])
    })
    .catch((err) => {
        res.status(404)
        res.send(err.message)
    })
}

function update(req, res) {
    companyServices.updateQuestion(req.body.questions, req.body.measures, req.body.id)
    .then((doc) => {
        res.status(202)
        res.json({message: 'Update successful', document: doc})
    })
    .catch((err) => {
        res.status(404)
        res.send(err.message)
    })
}

module.exports = router;