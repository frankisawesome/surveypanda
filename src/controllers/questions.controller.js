var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/today', today) //returns today's questionnare, create if non, for a particular company
router.post('/answer', answer) //answers a specific questionnare by company

//Controller functions
async function today(req, res) {
    try {
        //query params
        const id = req.query.id
        const date = new Date(Date.now())
        //find if questionnare exists
        const result = await questionServices.createIfNotFound(date, id)
        res.status(200)
        res.send(result)
    }
    catch(err) {
        if (err.message == "Cannot read property 'questions' of undefined") {
            res.status(400)
            res.send("Company ID not valid, check that the company exists!")
        }
        else {
            res.status(400)
            res.send(err.message)
        }
    }
}

function answer(req, res) {
    //query params
    const id = req.body.id
    const date = new Date(Date.now())
    const answers = req.body.answers

    questionServices.updateAnswers(id, date, answers)
        .then((doc) => {
            res.status(200)
            res.send(doc)
        })
        .catch((err) => {
            res.status(400)
            console.log(err)
            res.send(err.message)
        })

}
module.exports = router