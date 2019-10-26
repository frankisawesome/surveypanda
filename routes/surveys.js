var express = require('express');
var router = express.Router();
const Survey = require('./model');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Post or get some surveys here');
});

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
