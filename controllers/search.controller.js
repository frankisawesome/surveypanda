var Router = require('express')
var router = Router()
const questionServices = require('../services/question.services')
const searchServices = require('../services/search.services')
const dateServices = require('../services/date.services')
const testServices = require('../services/test.services')

//API Endpoints
router.get('/day', getDaily)
router.get('/week', getWeekly)
router.get('/trend', getTrend)


//Controller functions
async function getDaily(req, res) {
    const id = req.query.id
    const date = new Date(Date.now())

    try {
        let qset = await questionServices.find(id, date);
        if (qset.length === 0) {
            res.status(200)
            res.send("There's no answers for today yet!")
        }
        else {
            qset = qset[0]
        }
        res.status(200)
        res.send(searchServices.trimAverages(qset.summary))
    }
    catch (err) {
        res.status(400)
        console.log(err)
        res.send(err.message)
    }
}

async function getWeekly(req, res) {
    const id = req.query.id
    const date = dateServices.startOfWeek(req.query.week)
    try {
        let qsetArr = await questionServices.findWeek(id, date)

        const resultSummary = searchServices.trimAverages(searchServices.summaryForArray(qsetArr))

        res.status(200)
        res.send(resultSummary)
    }

    catch(err) {
        if (err.error){
            if (err.message == "Cannot read property 'measures' of undefined") {
                res.send("You are querying legacy data where summary on save was not implemented!")
            }
            else {
                res.status(400)
                res.send(err.message)
            }
        }
        else {
            res.status(200)
            res.send(err.message)
        }
    }
}

async function getTrend(req, res) {
    try {
        let date = new Date(Date.now())
        const qsetArr = await questionServices.findWeek(req.query.id, date)
        if (qsetArr.length === 0){
            throw {
                error: true,
                message: "Can't find questionsets, check your id"
            }
        }
        const data = await searchServices.returnTrend(qsetArr)
        res.send(data)
    }
    catch(err) {
        res.status(400)
        res.send(err.message)
    }
}

module.exports = router