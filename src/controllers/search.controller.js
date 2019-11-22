var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/day', getDaily)


//Controller functions
function getDaily(req, res) {
    const name = req.body.name
    const date = new Date(Date.now())
    
    questionServices.find(name, date)
    .then((qset) => {
        if (qset.length === 0){
            throw {
                error: true,
                message: "No questionnaire for today, check your request body!"
            }
        }
        else {
            return qset[0]
        }
    })
    .then((qset) => {
        const result = {
            measures: [],
            averages: []
        }
        qset.questions.map((question) => {

        })
    })
    .catch((err) => {
        res.status(400)
        res.send(err.message)
    })
}

module.exports = router