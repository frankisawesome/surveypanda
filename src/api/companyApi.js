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

router.post('/new', parseNew, async (req, res) => {
    const post = req.payload

    post.save((err) => {
        res.send(err ? err : post);
    })
})

module.exports = router;