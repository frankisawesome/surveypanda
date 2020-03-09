//dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')

module.exports = {
    create,
    authorise,
    authenticate,
    verify,
    generateVerification,
    employerAuthorise,
    checkEmail
}

//business logic for creating new user in the database, hashing the password
async function create(userparams) {
    if (userparams.code !== process.env.INVITATION_CODE) {
        throw {
            error: true,
            message: "Incorrect invitation code!"
        }
    } else if (await User.findOne({
            email: userparams.email
        })) {
        throw {
            error: true,
            message: `User ${userparams.email} already exists`
        }
    }
    const user = new User(userparams)

    user.hash = bcrypt.hashSync(userparams.password, parseInt(process.env.SALT))
    user.companyId = userparams.name.replace(/\s+/g, '').toLowerCase()

    return user.save()
}

async function generateVerification(params){
    const user = await User.findOne( {email: params.email})
    if (user && !user.verified) {
        const token = jwt.sign({email: user.email, companyId: user.companyId}, process.env.PRIVATE_KEY)
        return token
    }
    else {
        throw {
            error: true,
            message: 'Cannot generate verification token'
        }
    }
}

//authenticate new login request
async function authenticate(userparams) {
    const user = await User.findOne({
        email: userparams.email
    })
    if (user) {
        if (bcrypt.compareSync(userparams.password, user.hash)) {
            //sign a token with username and 3 hour expiration as payload and private key from environmental variable
            if (!user.verified) {
                throw {
                    error: true,
                    message: "Account not verified"
                }
            }
            const res = {
                token: jwt.sign({
                    email: user.email,
                    companyId: user.companyId
                }, process.env.PRIVATE_KEY),
                companyId: user.companyId
            }
            return res
        } else {
            throw {
                error: true,
                message: 'Wrong password'
            }
        }
    } else {
        throw {
            error: true,
            message: 'Email not found'
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

    jwt.verify(req.header('Authorization'), process.env.PRIVATE_KEY, {
        maxAge: 36000
    }, function (err, decoded) {
        try {
            if (err) {
                throw {
                    error: err.name,
                    message: err.message
                }
            } else {
                req.jwt = decoded
                next();
            }
        } catch (e) {
            res.send(e.message)
        }
    });
}

async function verify(token) {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    const user = await User.findOne({
        email: decoded.email
    })
    if (!user) {
        throw {
            error: true,
            message: "User email not found"
        }
    } else if (user.verified) {
        throw {
            error: true,
            message: "Email already verified!"
        }
    } else {
        user.verified = true
        return user.save()
    }
    
}

async function checkEmail(email) {
    const user = await User.findOne({
        email: email
    })
    if (!user) {
        return false
    }
    else {
        throw {
            error: true,
            message: "Email already in use!"
        }
    }
}

//middleware function for authenticating employer accounts
function employerAuthorise(req, res, next) {
    if (!req.jwt) {
        res.status(401);
        res.json({
            error: 'Authorization failed',
            message: 'Failed to verify token'
        })
    } else if (req.jwt.group != 'employer') {
        res.status(401);
        res.json({
            error: 'Authorization failed',
            message: 'No employer privilege'
        })
    } else {
        next()
    }
}