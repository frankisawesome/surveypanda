const mongoose = require('mongoose')

function db(mongoose, db_string) {
    mongoose.connect(db_string, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      autoReconnect: true
    })
      .then(() => console.log('Connection to DB successful'))
      .catch((err) => {
        console.log(err)
      })
}

module.exports = db