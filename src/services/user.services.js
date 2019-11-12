//dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

module.exports = {
    create,
    authenticate
}

async function create(userparams) {
    if (await User.findOne({ username: userparams.username })) {
        throw {
            error: true,
            message: `User ${userparams.username} already exists`
        }
    }

    const user = new User(userparams)

    user.hash = bcrypt.hashSync(userparams.password, process.env.SALT)
    

    await user.save()
}

async function authenticate(userparams) {
    const user = await User.findOne({ username: userparams.username })
    if (user) {
        if (bcrypt.compareSync(userparams.password, user.hash)){
            //sign a token with username and 3 hour expiration as payload and private key from environmental variable
            return jwt.sign({username: userparams.username, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)}, process.env.PRIVATE_KEY)
        }
        else {
            throw new Error('wrong password')
        }
    }
    else {
        throw new Error('Username does not exist')
    }
}