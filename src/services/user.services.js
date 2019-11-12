//dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

module.exports = {
    create,
    authorise,
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
            throw {
                error: true,
                message: 'Wrong password'
            }
        }
    }
    else {
        throw  {
            error: true,
            message: 'Username not found'
        }
    }
}

//middleware function for authenticating a route
function authorise(req, res, next) {
    if (!req.header('Authorization')){
        res.status(401);
        res.json({
            error: true,
            message: 'Authorization failed - no header detected'
          })
    }

    jwt.verify(req.header('Authorization'), process.env.PRIVATE_KEY, function(err, decoded) {
        try{
            if (err){
                throw {
                    error: true,
                    message: 'Authorisation failed - invalid token'
                }
            }
            else {
                if (decoded.exp < Date.now()){
                    next()
                }
                else {
                    throw {
                        error: true,
                        message: 'Authorisation failed - expired token'
                    }
                }
            }
        }
        catch(e){
            res.status(401);
            res.json(e);
        }
    });
}