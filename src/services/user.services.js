//dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

module.exports = {
    create,
    authorise,
    authenticate,
    employerAuthorise
}

//business logic for creating new user in the database, hashing the password
async function create(userparams) {
    if (await User.findOne({ username: userparams.username })) {
        throw {
            error: true,
            message: `User ${userparams.username} already exists`
        }
    }
    const user = new User(userparams)

    user.hash = bcrypt.hashSync(userparams.password, parseInt(process.env.SALT))

    return user.save()
}

//authenticate new login request
async function authenticate(userparams) {
    const user = await User.findOne({ username: userparams.username })
    if (user) {
        if (bcrypt.compareSync(userparams.password, user.hash)) {
            //sign a token with username and 3 hour expiration as payload and private key from environmental variable
            return jwt.sign({ username: userparams.username, group: userparams.group }, process.env.PRIVATE_KEY)
        }
        else {
            throw {
                error: true,
                message: 'Wrong password'
            }
        }
    }
    else {
        throw {
            error: true,
            message: 'Username not found'
        }
    }
}

//middleware function for authenticating a route
function authorise(req, res, next) {
    if (!req.header('Authorization')) {
        res.status(401);
        res.json({
            error: true,
            message: 'Authorization failed - no header detected'
        })
    }

    jwt.verify(req.header('Authorization'), process.env.PRIVATE_KEY, { maxAge:36000}, function (err, decoded) {
        try {
            if (err) {
                throw {
                    error: err.name,
                    message: err.message
                }
            }
            else {
                req.jwt = decoded
                next();
            }
        }
        catch (e) {
            res.status(401);
            res.json(e);
        }
    });
}

//middleware function for authenticating employer accounts
function employerAuthorise (req, res, next){
    if (!req.jwt){
        res.status(401);
        res.json({
            error: 'Authorization failed',
            message: 'Failed to verify token'
        })
    }
    else if (req.jwt.group != 'employer'){
        res.status(401);
        res.json({
            error: 'Authorization failed',
            message: 'No employer privilege'
        })
    }
    else {
        next()
    }
}