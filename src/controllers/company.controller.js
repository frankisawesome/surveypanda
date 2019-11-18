var Router = require('express');
var router = Router();
const companyServices = require('../services/company.services')

//API endpoints
router.get('/', greet)
router.post('/new', companyServices.parse, create)
router.get('/find', find)
router.post('/update', update)


//Controller functionss
function greet(req, res) {
    res.send('Company API')
}

function create (req, res) {
    companyServices.create(req.payload)
    .then(() => {
        res.status(201)
        res.send(`Sucessfully created ${req.payload.name}`)
    })
    .catch((err) => {
        res.status(400)
        res.json(err)
    })
}

function find(req, res) {
    companyServices.find(req.body.name)
    .then((company) => {
        res.send(company)
    })
    .catch((err) => {
        res.status(404)
        res.send(err.message)
    })
}

function update(req, res) {
    companyServices.updateQuestion(req.body.questions, req.body.measures, req.body.name)
    .then((mes) => {
        res.status(202)
        res.send('Update successful')
    })
    .catch((err) => {
        res.status(404)
        res.send(err.message)
    })
}

module.exports = router;