const questionServices = require('./question.services')
const dateServices = require('./date.services')
const random = require('random')
const Company = require('../models/company')

module.exports = {
    generateMockData
}

//creates questionnaires for the past week, and generate random results for each day, given a company Id
async function generateMockData(id) {
    try {
        const newComp = new Company({
            name: id,
            nameid: id,
            industry: "test",
            dateCreated: Date.now(),
            lastUpdated: Date.now()
        })

        await newComp.save()

        const days = dateServices.daysThisWeek()

        for (let i = 0; i < days.length; i++){
            const updated = await createThenUpdate(id, days[i])
            console.log(updated)
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