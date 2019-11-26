var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/day', getDaily)


//Controller functions
async function getDaily(req, res) {
    const name = req.body.name
    const date = new Date(Date.now())
    
    try {
        let qset = await questionServices.find(name, date);
        if (qset.length === 0){
            throw {
                error: true,
                message: "Can't find requested questionnaire, could be: 1. the questionnaire does not exist, hit question/today first, 2. request body error, check that you have a correct name field in your request body"
            }
        }
        else {
            qset = qset[0]
        }
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
        res.status(200)
        res.send(summary)
    }
    catch(err) {
        res.status(400)
        console.log(err)
        res.send(err)
    }
}

async function getWeekly(req, res) {
    const name = req.body.name
    const date = req.body.startDate

    questionServices.findWeek(name, date)

}

module.exports = router