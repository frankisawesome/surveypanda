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
    companyServices.find(req.body.nameid)
    .then((company) => {
        res.send(company)
    })
    .catch((err) => {
        res.status(404)
        res.send(err.message)
    })
}

function update(req, res) {
    companyServices.updateQuestion(req.body.questions, req.body.measures, req.body.nameid)
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