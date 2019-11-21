var Router = require('express');
var router = Router();
const questionServices = require('../services/question.services');

//API Endpoints
router.get('/today', today) //returns today's questionnare, create if non, for a particular company
router.post('/answer', answer) //answers a specific questionnare by company

//Controller functions
function today(req, res) {
    //query params
    const name = req.body.name
    const date = new Date(Date.now())
    //find if questionnare exists
    questionServices.find(name, date)
        .then((doc) => {
            //if non existant create mode
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
            //else send questionnare
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

function answer(req, res) {
    //query params
    const name = req.body.name
    const date = new Date(Date.now())

}
module.exports = router