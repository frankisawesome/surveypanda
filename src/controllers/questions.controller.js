var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/today', today) //returns today's questionnare, create if non, for a particular company


//Controller functions
function today(req, res) {
    const name = req.body.name
    const date = new Date(Date.now())
    questionServices.find(name, date)
    .then((doc) => {
        console.log(doc)
        res.status(200)
        res.send(doc)
    })
    .catch((e) => {
        console.log(e)
        questionServices.create(name)
        .then((doc) => {
            res.status(201)
            res.send(doc)
        })
        .catch((err) => {
            res.status(400)
            res.send(err.message)
        })
    })
}

module.exports = router