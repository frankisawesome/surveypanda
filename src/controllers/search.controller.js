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
                message: "Can't find requested questionnaire, check your request body!"
            }
        }
        else {
            return qset[0]
        }
    })
    .then((qset) => {
        const summary = {
            measures: [],
            averages: []
        }
        qset.questions.map((question) => {
            let sum = 0;
            let count = 0;
            question.results.map((result) => {
                sum += result;
                count ++;
            })
            summary.averages.push(sum / count)
            summary.measures.push(question.measures)
        })
        return summary
    })
    .then((sum) => {
        res.status(200)
        res.send(sum)
    })
    .catch((err) => {
        res.status(400)
        res.send(err.message)
    })
}

function getWeekly(req, res) {
    const name = req.body.name
    const date = req.body.startDate

    questionServices.findWeek(name, date)
    
}

module.exports = router