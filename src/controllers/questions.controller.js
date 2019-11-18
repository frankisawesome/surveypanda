var Router = require('express');
var router = Router();
const questionServices = require('../services/company.services');

//API Endpoints
router.get('/today', today) //returns today's questionnare, create if non, for a particular company


//Controller functions
function today(req, res) {
    const date = Date.now()
    const name = req.body.name


}