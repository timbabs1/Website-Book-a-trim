'use strict'

const sqlite3 = require('sqlite3')

const DBName = 'barber_data'

const db = new sqlite3.Database(`./${DBName}.db`, (err) => {
	if (err) return console.error(err.message)
    console.log(`Connected to the "${DBName}" SQlite database.`)
})

let username_code = 'empty'

module.exports.barber_validate = (req, callback) => {
    db.serialize(() => {
        let username = req.query.barber_name
        let passwords = req.query.barber_pass
        db.all(`SELECT user_name,password FROM barber_data WHERE user_name = "${username}" AND password = "${passwords}"`, (err, rows) => {
            if (err) console.error(err.message)
            if (rows.length == 0 ) {
                const check = 2
                return callback(null, check)
            } else if (rows.length > 0) {
                const check = 1
                username_code = username
                return callback(null, check)
                }
        })
    })
}

module.exports.barber_logout = (req, callback) => {
    
    const check = {
        temp : username_code
    }
    check.number = 0
    username_code = 'empty'
    return callback(null, check)
}

module.exports.barber_check = (req, callback) => {
    const check = {
    }
    if (username_code == 'empty') {
        check.number = 0
        return callback(null, check)
    } else if (username_code !== 'empty') {
        check.name = username_code
        check.number = 1
        return callback(null, check)
    }
}

module.exports.barber_input = (req, callback) => {
    let username = req.query.barber_name
    let passwords = req.query.barber_pass
    let email = req.query.barber_email
    const sql = `INSERT INTO barber_data(user_name, password, email) VALUES("${username}", "${passwords}", "${email}")`
    db.run(sql, err => {
        console.log(`inserting ${username} ${passwords} ${email} into database`)
        if(err){
            const check = 0
            console.error(err.message)
            return callback(null, check)
        }
        if(!err){
            console.log(`added ${username} ${passwords} ${email} to barber database`)
            const check = 1
            username_code  = username
            return callback(null, check)
        }
    })
}

module.exports.barber_bookings = (req, callback) => {
    const barber_id = username_code
    console.log(barber_id)
    const sql2 = `SELECT trimmer_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE barber_username = "${barber_id}"`
    const check = {
        name : barber_id
    }
    db.all(sql2, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        console.log(rows.length)
        check.tname = rows.map(row => `<li>${row.trimmer_username}</li>`).join('')
        check.date = rows.map(row => `<li>${row.date}</li>`).join('')
        check.time1 = rows.map(row => `<li>${row.time_slot_9_10}</li>`).join('')
        check.time2 = rows.map(row => `<li>${row.time_slot_10_11}</li>`).join('')
        check.time3 = rows.map(row => `<li>${row.time_slot_11_12}</li>`).join('')
        check.time4 = rows.map(row => `<li>${row.time_slot_12_13}</li>`).join('')
        check.time5 = rows.map(row => `<li>${row.time_slot_13_14}</li>`).join('')
        check.time6 = rows.map(row => `<li>${row.time_slot_14_15}</li>`).join('')
        check.time7 = rows.map(row => `<li>${row.time_slot_15_16}</li>`).join('')
        check.time8 = rows.map(row => `<li>${row.time_slot_16_17}</li>`).join('')
        check.time9 = rows.map(row => `<li>${row.time_slot_17_18}</li>`).join('')
        check.time10 = rows.map(row => `<li>${row.time_slot_18_19}</li>`).join('')
        check.time11 = rows.map(row => `<li>${row.time_slot_19_20}</li>`).join('')
        check.time12 = rows.map(row => `<li>${row.time_slot_20_21}</li>`).join('')
        return callback(null, check)
    })
}

module.exports.barber_bookings2 = (req, callback) => {
    const barber_id = username_code
    console.log(barber_id)
    const sql2 = `SELECT trimmer_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE barber_username = "${barber_id}" AND date >= date('now')`
    const check = {
        name : barber_id
    }
    db.all(sql2, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        check.tname = rows.map(row => `<li>${row.trimmer_username}</li>`).join('')
        check.date = rows.map(row => `<li>${row.date}</li>`).join('')
        check.time1 = rows.map(row => `<li>${row.time_slot_9_10}</li>`).join('')
        check.time2 = rows.map(row => `<li>${row.time_slot_10_11}</li>`).join('')
        check.time3 = rows.map(row => `<li>${row.time_slot_11_12}</li>`).join('')
        check.time4 = rows.map(row => `<li>${row.time_slot_12_13}</li>`).join('')
        check.time5 = rows.map(row => `<li>${row.time_slot_13_14}</li>`).join('')
        check.time6 = rows.map(row => `<li>${row.time_slot_14_15}</li>`).join('')
        check.time7 = rows.map(row => `<li>${row.time_slot_15_16}</li>`).join('')
        check.time8 = rows.map(row => `<li>${row.time_slot_16_17}</li>`).join('')
        check.time9 = rows.map(row => `<li>${row.time_slot_17_18}</li>`).join('')
        check.time10 = rows.map(row => `<li>${row.time_slot_18_19}</li>`).join('')
        check.time11 = rows.map(row => `<li>${row.time_slot_19_20}</li>`).join('')
        check.time12 = rows.map(row => `<li>${row.time_slot_20_21}</li>`).join('')
        return callback(null, check)
    })  
}

module.exports.barber_bookings3 = (req, callback) => {
    const barber_id = username_code
    const bookings_date = req.query.bookings_date
    console.log(barber_id)
    const sql2 = `SELECT trimmer_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE barber_username = "${barber_id}" AND date = "${bookings_date}"`
    const check = {
        name : barber_id
    }
    db.all(sql2, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        check.tname = rows.map(row => `<li>${row.trimmer_username}</li>`).join('')
        check.date = rows.map(row => `<li>${row.date}</li>`).join('')
        check.time1 = rows.map(row => `<li>${row.time_slot_9_10}</li>`).join('')
        check.time2 = rows.map(row => `<li>${row.time_slot_10_11}</li>`).join('')
        check.time3 = rows.map(row => `<li>${row.time_slot_11_12}</li>`).join('')
        check.time4 = rows.map(row => `<li>${row.time_slot_12_13}</li>`).join('')
        check.time5 = rows.map(row => `<li>${row.time_slot_13_14}</li>`).join('')
        check.time6 = rows.map(row => `<li>${row.time_slot_14_15}</li>`).join('')
        check.time7 = rows.map(row => `<li>${row.time_slot_15_16}</li>`).join('')
        check.time8 = rows.map(row => `<li>${row.time_slot_16_17}</li>`).join('')
        check.time9 = rows.map(row => `<li>${row.time_slot_17_18}</li>`).join('')
        check.time10 = rows.map(row => `<li>${row.time_slot_18_19}</li>`).join('')
        check.time11 = rows.map(row => `<li>${row.time_slot_19_20}</li>`).join('')
        check.time12 = rows.map(row => `<li>${row.time_slot_20_21}</li>`).join('')
        return callback(null, check)
    })  
}