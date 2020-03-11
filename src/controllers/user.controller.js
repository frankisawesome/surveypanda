const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');
const companyService = require('../services/company.services');
const emailService = require('../services/email.services');
const testServices = require('../services/test.services')

//API endpoints
router.get('/', greet)
router.post('/new', companyService.parse, create)
router.post('/login', authenticate)
router.get('/verify', verify) //verifies email
router.get('/testverify', testverify) //verifies email without using jwt, testing only
//checks the email is available
router.get('/checkemail', checkemail)
router.get('/sign', sign)
//testing the authorise and emplyoer authorise middlewares
router.get('/authorisethis', userService.authorise, userService.employerAuthorise, (req, res) => res.send('Your through!'))
//create a test account with randomised mock data
router.post('/test', test)
router.get('/clear', clear)

//controller functions
function greet(req, res){
    res.send('User API')
}

async function clear(req, res) {
    try {
        await testServices.clearCollections()
        res.status(200)
        res.send('Sucess')
    }catch(err) {
        res.stats(400)
        res.send(err.message)
    }
}

async function checkemail(req, res) {
    try {
        await userService.checkEmail(req.query.email)
        res.status(200)
        res.send("Email okay")
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

async function sign(req, res) {
    try {
        const token = await userService.generateVerification(req.body)
        res.status(200)
        res.send(token)
    }
    catch(err){
        res.status(400)
        res.send(err.message)
    }
    
}

//create new user
async function create(req, res){
    try {
        const newUser = await userService.create(req.body)
        const newCompany = await companyService.create(req.payload)
        const reqbody = req.body
        res.status(201)
        res.send(`Successfully created user ${newUser.email} for company ${newCompany.name}`)
        const token = await userService.generateVerification(reqbody)
        await emailService.sendVerificationCode(token, reqbody.email) 
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

//create new test user
async function test(req, res) {
    try {
        await testServices.generateMockData(req.body)
        const reqbody = req.body
        res.status(201)
        res.send(`Successfully created user`)
        const token = await userService.generateVerification(reqbody)
        await emailService.sendVerificationCode(token, reqbody.email)
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

//authenticate a login request with a JWT
function authenticate(req, res){
    userService.authenticate(req.body)
    .then((response) => {
        res.status(200)
        res.send(response)
    })
    .catch((err) => {
        res.status(401)
        res.send(err)
    })
}

async function verify(req, res) {
    try {
        const user = await userService.verify(req.query.token)
        if (user.verified){
            res.status(200)
            res.send('Email verified!')
        }
        else {
            res.status(500)
            res.send('Server side error')
        }
    }
    catch (err) {
        res.status(400)
        res.send(err.message)
    }
}

async function testverify(req, res) {
    try {
        const user = await userService.testverify(req.query.email)
        if (user.verified) {
            res.status(200)
            res.send('Email verified')
        }
        else {
            res.status(500)
            res.send('Server side error')
        }
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

module.exports = router