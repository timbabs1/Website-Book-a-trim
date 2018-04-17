'use strict'

const sqlite3 = require('sqlite3')

const DBName = 'barber_data'

const db = new sqlite3.Database(`./${DBName}.db`, (err) => {
	if (err) return console.error(err.message)
    console.log(`Connected to the "${DBName}" SQlite database.`)
})

let username_code = 'empty'

module.exports.trimmer_validate = (req, callback) => {
    db.serialize(() => {
        let username = req.query.trimmer_name
        let passwords = req.query.trimmer_pass
        const check = {
        }
        db.all(`SELECT user_name,password FROM trimmer_data WHERE user_name = "${username}" AND password = "${passwords}"`, (err, rows) => {
            if (err) console.error(err.message)
            if (rows.length == 0 ) {
                check.number = 2
                return callback(null, check)
            } else if (rows.length > 0) {
                const sql4 = `SELECT user_name FROM barber_data`
                db.all(sql4, (err, rows) => {
                    if (err) {
                        check.number = 2
                        console.error(err.message)
                        return callback(null, check)
                    } else check.number = 1
                    username_code = username
                    check.barber_name = rows.map(row => `<li>${row.user_name}</li>`).join('')
                    console.log(username_code)
                    return callback(null, check)
                })}
            })
    })
}

module.exports.trimmer_logout = (req, callback) => {
    
    const check = {
        temp : username_code
    }
    check.number = 0
    username_code = 'empty'
    return callback(null, check)
}

module.exports.trimmer_check = (req, callback) => {
    
    const check = {
    }
    
    if (username_code == 'empty') {
        check.number = 0
        return callback(null, check)
    }   const sql4 = `SELECT user_name FROM barber_data`
        db.all(sql4, (err, rows) => {
            if (err) {
                check.number = 0
                console.error(err.message)
                return callback(null, check)
        } else
        check.name = username_code
        check.number = 1
        check.barber_name = rows.map(row => `<li>${row.user_name}</li>`).join('')
        return callback(null, check)
    })
}

module.exports.trimmer_input = (req, callback) => {
    let username = req.query.trimmer_name
    let passwords = req.query.trimmer_pass
    let email = req.query.trimmer_email
    const sql = `INSERT INTO trimmer_data(user_name, password, email) VALUES("${username}", "${passwords}", "${email}")`
    const check = {
    }
    db.run(sql, err => {
        console.log(`inserting ${username} ${passwords} ${email} into database`)
        if(err){
            check.number = 0
            console.error(err.message)
            return callback(null, check)
        }
        if(!err){
            const sql4 = `SELECT user_name FROM barber_data`
            db.all(sql4, (err, rows) => {
                if (err) {
                    check.number = 2
                    console.error(err.message)
                    return callback(null, check)
                } else check.number = 1
                username_code = username
                console.log(username_code)
                check.barber_name = rows.map(row => `<li>${row.user_name}</li>`).join('')
                console.log(`added ${username} ${passwords} ${email} to trimmer database`)
                return callback(null, check)
            })            
        }
    })
}

module.exports.trimmer_book = (req, callback) => {
    const barber_id = req.query.barber_search
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    console.log(barber_id)
    const sql2 = `SELECT barber_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE barber_username = "${barber_id}"`
    
    const check = {
        trimmer_id : username_code
    }
    db.all(sql2, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        check.today = today
        check.name = rows.map(row => `<li>${row.barber_username}</li>`).join('')
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

module.exports.trimmer_book_2 = (req, callback) => {
    const barber_id = req.query.barber_search
    const barber_date = req.query.barber_date
    console.log(barber_id)
    console.log(barber_date)

    const sql3 = `SELECT barber_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE barber_username = "${barber_id}" AND date = "${barber_date}"`
    
    const check = {
        trimmer_id : username_code
    }
    db.all(sql3, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        check.name = rows.map(row => `<li>${row.barber_username}</li>`).join('')
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

module.exports.trimmer_book_3 = (req, callback) => {
    const sql4 = `SELECT barber_username, date, time_slot_9_10, time_slot_10_11,
    time_slot_11_12, time_slot_12_13, time_slot_13_14, time_slot_14_15, 
    time_slot_15_16, time_slot_16_17, time_slot_17_18, time_slot_18_19, 
    time_slot_19_20, time_slot_20_21 FROM bookings WHERE date >= date('now')`
    
    const check = {
        trimmer_id : username_code
    }
    db.all(sql4, (err, rows) => {
        if(err) {
            check.number = 0
            console.error(err.message)
        } else if (rows.length <= 0) {
            check.number = 3
            return callback(null, check)
        } else check.number = 1
        check.name = rows.map(row => `<li>${row.barber_username}</li>`).join('')
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

module.exports.book_a_trim = (req, callback) => {    
    const barber_id = req.query.barber_name
    const check = {
        trimmer_id: username_code
    }
    const barber_date = req.query.barber_date
    const time_slot = req.query.time_Slot_List
    console.log(time_slot)
    console.log(barber_date)

    const sql5 = `SELECT "${time_slot}", date FROM bookings WHERE date = "${barber_date}" AND "${time_slot}" = 'Taken'`

    const sql6 = `SELECT user_name FROM barber_data WHERE user_name = "${barber_id}"`

    const sql4 = `INSERT INTO bookings(barber_username, trimmer_username, date, "${time_slot}") VALUES("${barber_id}", "${check.trimmer_id}", "${barber_date}", "Taken")`

    db.all(sql5, (err, rows) => {
        if (rows.length > 0 || username_code == 'empty') {
            check.number = 2
            console.log('booking exist or please re-login')
            return callback(null, check)
        }
        else if (rows.length <= 0) {
            console.log('booking doesnt exist')
            db.all(sql6, (err, rows) => {
                if (rows.length <= 0) {
                    check.number = 0
                    console.log('barber doesnt exist or not in DB')
                    return callback(null, check)
                } else if (rows.length > 0) {
                    db.all(sql4, (err, rows) => {
                        if(err) {
                            check.number = 0
                            console.error(err.message)
                            return callback(null, check)
                        } else check.number = 1
                        return callback(null, check)
                    })
                }
            })
}})}