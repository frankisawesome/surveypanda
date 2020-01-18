const nodemailer = require('nodemailer')
const key = require('../../gcpkey.json')
const sender = 'frank@surveypanda.page'

module.exports = {
    sendVerificationCode
}

//Sends a verification link for email verification, to a specific email address
async function sendVerificationCode(code, email) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type: 'OAuth2',
            user: sender,
            serviceClient: key.client_id,
            privateKey: key.private_key
        }
    })
    try {
        await transporter.verify()
        await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify you email address for Survey Panda",
            text: `Click on link: localhost:3001/user/verify?token=${code}`
        })
    }
    catch (err) {
        throw {
            error: true,
            message: err
        }
    }
}