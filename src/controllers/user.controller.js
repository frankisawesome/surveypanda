const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');
const companyService = require('../services/company.services');

//API endpoints
router.get('/', greet)
router.post('/new', companyService.parse, create)
router.post('/login', authenticate)
//testing the authorise and emplyoer authorise middlewares
router.get('/authorisethis', userService.authorise, userService.employerAuthorise, (req, res) => res.send('Your through!'))

//controller functions
function greet(req, res){
    res.send('User API')
}

//create new user
async function create(req, res){
    try {
        const newUser = await userService.create(req.body)
        const newCompany = await companyService.create(req.payload)
        res.status(201)
        res.send(`Successfully created user ${newUser.email} for company ${newCompany.name}`)
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

//authenticate a login request with a JWT
function authenticate(req, res){
    userService.authenticate(req.body)
    .then((token) => {
        res.status(200)
        res.json({
            success: true,
            token: token
        })
    })
    .catch((err) => {
        res.status(401)
        res.json(err)
    })
}

module.exports = router