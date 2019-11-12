//dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const dotenv = require("dotenv")

//environmental variables
const salt = process.env.SALT
const private_key = process.env.KEY

module.exports = {
    create
}

async function create(userparams) {
    if (await User.findOne({ username: userparams.username })) {
        throw {
            error: true,
            message: `User ${userparams.username} already exists`
        }
    }

    const user = new User(userparams)

    user.hash = bcrypt.hashSync(userparams.password, salt)
    

    await user.save()
}