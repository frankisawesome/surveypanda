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
            html: `
            <h1>Welcome Aboard!<h1>
            <p>Thank you so much for joining the testing community for surveypanda, please contact Frank for bug reports</p>
            <button><a href="https://surveypandaa.appspot.com/user/verify?token=${code}">Verify</a><//button>
            <p>Or Click on link https://surveypandaa.appspot.com/user/verify?token=${code}</p>`
        })
    }
    catch (err) {
        throw {
            error: true,
            message: err
        }
    }
}