var Router = require('express');
var router = Router();
const Company = require('../models/company')

function parseNew (req, res, next) {
    const post = new Company({
        name: req.body.name,
        industry: req.body.industry,
        subscription: req.body.subscription,
        dateCreated: Date.now(),
        questions: "default",
        lastUpdated: Date.now()
    })

    req.payload = post;

    next();
}

router.get('/', (req, res) => {
    res.send('Company API')
})

router.post('/new', parseNew, async (req, res, next) => {
    const post = req.payload

    await post.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            let posted;
            Company.find({name: req.payload.name}, function(err, docs) {
                id = docs[0]._id
                res.send(`Successfully created company ${req.payload.name}, the company ID is ${id}`)
            })
        }
    })
})

module.exports = router;