const questionServices = require('./question.services')
const dateServices = require('./date.services')
const userServices = require('./user.services')
const random = require('random')
const Company = require('../models/company')
const User = require('../models/user')
const Qset = require('../models/questionSet')

module.exports = {
    generateMockData,
    clearCollections
}

//creates questionnaires for the past week, and generate random results for each day, given a company Id
async function generateMockData(body) {
    try {
        const newComp = new Company({
            name: body.name,
            nameid: body.name.replace(/\s+/g, '').toLowerCase(),
            industry: "test",
            dateCreated: Date.now(),
            lastUpdated: Date.now()
        })
        await userServices.create(body)
        await newComp.save()

        const days = dateServices.daysThisWeek()

        for (let i = 0; i < days.length; i++){
            const updated = await createThenUpdate(body.name.replace(/\s+/g, '').toLowerCase(), days[i])
        }
    } catch (err) {
        throw {
            error: true,
            message: "Error generating mock data"
        }
    }
}

async function createThenUpdate(id, day) {
    await questionServices.createIfNotFound(day, id)
    const results = []
    for (i = 0; i < 3; i++) {
        results.push(random.int(1, 5))
    }
    return await questionServices.updateAnswers(id, day, results)
}

async function clearCollections () {
    await Company.deleteMany()
    await User.deleteMany()
    await Qset.deleteMany()
}