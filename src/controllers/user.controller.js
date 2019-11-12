const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');

//API endpoints
router.get('/', greet)
router.post('/new', create)

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

module.exports = router