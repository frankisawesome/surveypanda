module.exports = {
    startOfWeek,
    intervalDay,
    intervalWeek,
    daysThisWeek
}

//default to start of the current week or start of a week prior to current week
function startOfWeek (start) {
    let date;
    if (start == undefined) {
        const today = new Date(Date.now())
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
        upper = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 23)
        lower = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    }
    catch (err) {
        throw err
    }
    return [upper, lower]
}

//return an array of dates that are in the current week
function daysThisWeek () {
    const today = new Date(Date.now())
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
    const dateArr = []
    dateArr.push(yesterday)
    for (i = 1; i < 7; i ++) {
        dateArr.push(new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() - i))
    }
    dateArr.reverse()
    return dateArr
}

