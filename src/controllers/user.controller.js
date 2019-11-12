const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');

//API endpoints
router.get('/', greet)
router.post('/new', create)
router.post('/login', authenticate)

//controller functions
function greet(req, res){
    res.send('User API')
}

function create(req, res){
    userService.create(req.body)
    .then(() => {
        res.status(201)
        res.send(`Successfully created user ${req.body.username}`)
    })
    .catch((err) => {
        res.status(400)
        res.send(err)
    })
}

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
        res.json({
            success: false,
            error: JSON.stringify(err)
        })
    })
}

module.exports = router