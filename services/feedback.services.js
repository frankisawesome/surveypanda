const questionServices = require('./question.services')

module.exports = {
    updateFeedback
}

async function updateFeedback(id, date, feedback) {
    try {
        let qsetArr = await questionServices.find(id, date)
        if (qsetArr.length === 0) {
            await questionServices.createIfNotFound(date, id)
            qsetArr = await questionServices.find(id, date)
        }
        const qset = qsetArr[0]
        qset.feedback.push(feedback)
        return qset.save()
    }
    catch (err) {
        throw err
    }
}