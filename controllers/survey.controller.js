// --------- WARNNING -------------- //
/*
Survey route is used in release version v0.1
In the process of getting deprecated
Please do not make changes or use any of the below functions as dependencies
This file and all supporting API routes will be removed in the new version
*/
// --------------------------------- //

var express = require('express');
var router = express.Router();
const Survey = require('../models/survey');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Post or get some surveys here');
});


//Get survey results from today
router.get('/music', (req, res) => {
  Survey.find((err, surveys) => {
    if (err) return console.error(err);
    const data = [];
    surveys.map((survey) => {
      data.push(survey.music);
    })
    var num = 0
    var divide = 0
    data.map((score) => {
      num += score
      divide += 5
    })
    const result = num / divide;
    res.json({
      percentage: result
    })
  })
})

router.get('/stress', (req, res) => {
  Survey.find((err, surveys) => {
    if (err) return console.error(err);
    const data = [];
    surveys.map((survey) => {
      data.push(survey.stress);
    })
    var num = 0
    var divide = 0
    data.map((score) => {
      num += score
      divide += 5
    })
    const result = num / divide;
    res.json({
      percentage: result
    })
  })
})

router.get('/cleanliness', (req, res) => {
  Survey.find((err, surveys) => {
    if (err) return console.error(err);
    const data = [];
    surveys.map((survey) => {
      data.push(survey.cleanliness);
    })
    var num = 0
    var divide = 0
    data.map((score) => {
      num += score
      divide += 5
    })
    const result = num / divide;
    res.json({
      percentage: result
    })
  })
})

//get total number
router.get('/total', (req, res)=> {
  Survey.find((err, surveys) => {
    if (err) return console.error(err);
    var count = 0;
    surveys.map((useless) => {
      count ++;
    })
    res.json({
      count: count
    })
  })
})

//Post route for new message creation
router.post('/new', async (req, res) => {
  const post = new Survey ({
    userId: req.body.userId,
    music: req.body.music,
    stress: req.body.stress,
    cleanliness: req.body.cleanliness
  })
  try {
    const posted = await post.save();
    res.send({ "message": "success", "posted": posted })
  } catch (err) {
    res.send({ "message": err })
  }
})

module.exports = router;
