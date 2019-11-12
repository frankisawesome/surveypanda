var Router = require('express');
var router = Router();
const Company = require('../models/company')
const companyServices = require('../services/company.services')

//API endpoints
router.get('/', greet)
router.post('/new', companyServices.parse, create);


//call backs
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

module.exports = router;