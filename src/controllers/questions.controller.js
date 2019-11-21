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
            if (doc.length === 0) {
                questionServices.create(name)
                    .then((newdoc) => {
                        res.status(201)
                        res.send(newdoc)
                    })
                    .catch((err) => {
                        res.status(400)
                        res.send(err.message)
                    })
            }
            else {
                res.status(200)
                res.send(doc)
            }
        })
        .catch((e) => {
            console.log(e)
            res.send(e)
        })
}

module.exports = router