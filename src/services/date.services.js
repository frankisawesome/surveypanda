module.exports = {
    startOfWeek,
    intervalDay,
    intervalWeek
}

//default to start of the current week or start of a week prior to current week
function startOfWeek (start) {
    let date;
    if (start == undefined) {
        const today = new Date(Date.now())
        console.log(today.getDay())
        console.log(today.getDate())
        date = new Date (today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
    }
    else if (start > 0) {
        throw {
            error: true,
            message: "pass a valid week value (<= 0), or ommit for current week"
        }
    }
    else {
        const today = new Date(Date.now())
        date = new Date (today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - (7 * start))
    }
    return date
}

//return 0:00 and 24:00 of a given day
function intervalDay (date) {
    let upper, lower
    try {
        upper = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        lower = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    catch(err) {
        throw err
    }
    return [upper, lower]
}

//return a interval of week given starting day
function intervalWeek (date) {
    let upper, lower
    try {
        upper = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        lower = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    catch (err) {
        throw err
    }
    return [upper, lower]
}

