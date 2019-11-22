var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/day', getDaily)


//Controller functions
function getDaily(req, res) {
    res.send('get daily')
}

module.exports = router