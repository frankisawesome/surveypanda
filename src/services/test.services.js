const companyServices = require('./company.services')
const dateServices = require('./date.services')

module.exports = {

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

        days.map((day) => {
            
        })
    }
    catch (err){
        throw {
            error: true,
            message: "Error generating mock data"
        }
    }
}

