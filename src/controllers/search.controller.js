var Router = require('express')
var router = Router()
const questionServices = require('../services/question.services')
const searchServices = require('../services/search.services')
const dateServices = require('../services/date.services')

//API Endpoints
router.get('/day', getDaily)
router.get('/week', getWeekly)
router.get('/trend', getTrend)


//Controller functions
async function getDaily(req, res) {
    const name = req.body.name
    const date = new Date(Date.now())

    try {
        let qset = await questionServices.find(name, date);
        if (qset.length === 0) {
            throw {
                error: true,
                message: "Can't find requested questionnaire, could be: 1. the questionnaire does not exist, hit question/today first, 2. request body error, check that you have a correct name field in your request body"
            }
        }
        else {
            qset = qset[0]
        }
        res.status(200)
        res.send(qset.summary)
    }
    catch (err) {
        res.status(400)
        console.log(err)
        res.send(err.message)
    }
}

async function getWeekly(req, res) {
    const name = req.body.name
    const date = dateServices.startOfWeek(req.body.week)
    try {
        let qsetArr = await questionServices.findWeek(name, date)

        const resultSummary = searchServices.summaryForArray(qsetArr)

        res.status(200)
        res.send(resultSummary)
    }

    catch(err) {
        if (err.message == "Cannot read property 'measures' of undefined") {
            res.send("Ydou are querying legacy data where summary on save was not implemented!")
        }
        else {
            res.status(400)
            res.send(err.message)
        }
    }
}

async function getTrend(req, res) {

}

module.exports = router