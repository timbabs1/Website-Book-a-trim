'use strict'

const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const app = express()
app.use(express.static('public'))

app.engine('html', es6Renderer)
app.set('views', './public/html')
app.set('view engine', 'html')

const publicDir = express.static('public')
app.use(publicDir)

const bodyParser = require('body-parser')
const parser = bodyParser.urlencoded({ extended: true })
app.use(parser)

const sqlite3 = require('sqlite3')

const barber_logic = require('./public/js/barber_logic')
const trimmer_logic = require('./public/js/trimmer_logic')

const port = 8080

const status = {
	'serverError': 500
}

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/html/index.html`)
})

app.get('/about', (req, res) => {
    res.sendFile(`${__dirname}/public/html/about.html`)
})

app.get('/register', (req, res) => {
    res.sendFile(`${__dirname}/public/html/barber_register.html`)
})

app.get('/register_trimmer', (req, res) => {
    res.sendFile(`${__dirname}/public/html/trimmer_register.html`)
})

app.get('/recover_account', (req, res) => {
    res.sendFile(`${__dirname}/public/html/page_const.html`)
})

app.get('/barber_login', (req, res) => {
    res.sendFile(`${__dirname}/public/html/barber_login.html`)
})

app.get('/trimmer_login', (req, res) => {
    res.sendFile(`${__dirname}/public/html/trimmer_login.html`)
})

app.get('/trimmer_home', (req, res) => {
    trimmer_logic.trimmer_check(req, (err, data) => {
        if(err) console.log(err.message)
        if (data.number == 0) {
            res.redirect('trimmer_login')
        } else if (data.number == 1) {
            res.render('trimmer_home', {locals: {name: data.name, bname: data.barber_name}})
        }
    })
})

app.get('/barber_home', (req, res) => {
    barber_logic.barber_check(req, (err, data) => {
        if(err) console.log(err.message)
        if (data.number == 0) {
            res.redirect('barber_login')
        } else if (data.number == 1) {
            res.render('barber_home', {locals: {name: data.name}})
        }
    })
})

app.get('/log_out_trimmer', (req, res) => {
    res.sendFile(`${__dirname}/public/html/log_out_trimmer.html`)
})

app.get('/log_out_barber', (req, res) => {
    res.sendFile(`${__dirname}/public/html/log_out_barber.html`)
})

app.get('/logged_out_trimmer', (req, res) => {
    trimmer_logic.trimmer_logout(req, (err, data) => {
        if(err) console.log(err.message)
        if (data.number == 0) {
            res.render('logged_out_trimmer', {locals: {tname: data.temp}})
        } else if (data.number == 1) {
            res.write('<html><body><h1>Log out attempty failed.</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
    })
})

app.get('/logged_out_barber', (req, res) => {
    barber_logic.barber_logout(req, (err, data) => {
        if(err) console.log(err.message)
        if (data.number == 0) {
            res.render('logged_out_barber', {locals: {name: data.temp}})
        } else if (data.number == 1) {
            res.write('<html><body><h1>Log out attempty failed.</h1> <a href="/barber_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
    })
})

app.get('/barber_register', (req, res) => {
    barber_logic.barber_input(req, (err, data) => {
        if(err) console.log(err.message)
        if (data == 1) {
            return res.render('barber_home', {locals: {name: req.query.barber_name}})
        } else if (data == 0) {
            res.write('<html><body><h1>Could not create account, database error</h1> <a href="/barber_register">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})

app.get('/trimmer_register', (req, res) => {
    trimmer_logic.trimmer_input(req, (err, data) => {
        if(err) console.log(err.message)
        if (data.number == 1) {
            return res.render('trimmer_home', {locals: {name: req.query.trimmer_name, bname: data.barber_name}})
        } else if (data.number == 0) {
            res.write('<html><body><h1>Could not create account, database error</h1> <a href="/barber_register">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})

app.get('/barber_bookings', (req, res) => {
    barber_logic.barber_bookings(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('barber_bookings', {locals: {name: data.name, tname: data.tname, 
                date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0 || 3) {
            res.write('<html><body><h1>Could not view bookings, database error</h1> <a href="/barber_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})

app.get('/barber_bookings2', (req, res) => {
    barber_logic.barber_bookings2(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('barber_bookings', {locals: {name: data.name, tname: data.tname, 
                date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0 || 3) {
            res.write('<html><body><h1>Could not view bookings, database error or no booking exist with fields selected</h1> <a href="/barber_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})

app.get('/barber_bookings3', (req, res) => {
    barber_logic.barber_bookings3(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('barber_bookings', {locals: {name: data.name, tname: data.tname, 
                date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0 || 3) {
            res.write('<html><body><h1>Could not view bookings, database error or no booking exist with fields selected</h1> <a href="/barber_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})

app.get('/trim_bookings', (req, res) => {
    trimmer_logic.trimmer_book(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            const tname = req.query.trimmer_name
            console.log(tname)
            return res.render('trimmer_bookings', {locals: {tname:data.trimmer_id, name: req.query.barber_search, 
                fill_date: data.today, bname: data.name, date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0) {
            res.write('<html><body><h1>Could not view barber times, database error</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        } else if (data.number == 3) {
            res.render('no_booking', {locals: {tname:data.trimmer_id, name:req.query.barber_search, date:data.today}})
        }
})
})

app.get('/trim_bookings_2', (req, res) => {
    trimmer_logic.trimmer_book_2(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('trimmer_bookings2', {locals: {tname:data.trimmer_id, name: req.query.barber_search, 
                fill_date: req.query.barber_date, bname: data.name, date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0) {
            res.write('<html><body><h1>Could not view barber times, database error</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        } else if (data.number == 3) {
            res.render('no_booking', {locals: {tname:data.trimmer_id, date:req.query.barber_date, name:req.query.barber_search}})
        }
})
})

app.get('/trim_bookings_3', (req, res) => {
    trimmer_logic.trimmer_book_3(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('trimmer_bookings3', {locals: {tname:data.trimmer_id, name: req.query.barber_search, 
                bname: data.name, date:data.date, time_slot1:data.time1, time_slot2:data.time2, 
                time_slot3:data.time3, time_slot4:data.time4, time_slot5:data.time5, time_slot6:data.time6, 
                time_slot7:data.time7, time_slot8:data.time8, time_slot9:data.time9, time_slot10:data.time10, 
                time_slot11:data.time11, time_slot12:data.time12}})
        } else if (data.number == 0) {
            res.write('<html><body><h1>Could not view barber times, database error</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        } else if (data.number == 3) {
            res.render('no_booking', {locals: {tname:data.trimmer_id}})
        }
})
})

app.get('/book_a_trim', (req, res) => {
    trimmer_logic.book_a_trim(req, (err, data) => {
        if(err) console.log(err.message)
        console.log(data.number)
        if (data.number == 1) {
            return res.render('trim_booked', {locals: {tname:data.trimmer_id}})
        } else if (data.number == 0) {
            res.write('<html><body><h1>Could not book trim, database error or barber not in db, please cross-check barber name</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        } else if (data.number == 2) {
            res.write('<html><body><h1>Booking already exist, please pick another time slot or date thank you or please re-login and try again</h1> <a href="/trimmer_home">Back</a>')
            res.write('</html></body>')
            res.end()
        }
})
})


app.get('/barbervalid', (req, res) => {
    barber_logic.barber_validate(req, (err, data) => {
        if(err) {
            console.log(err.message)
        } 
        if (data == 1) {
            return res.render('barber_home', {locals: {name: req.query.barber_name}})
            console.log('option 1')
        } else if (data == 2) {
            res.sendFile(`${__dirname}/public/html/wrong_user.html`)
        }
    })
})

app.get('/trimmervalid', (req, res) => {
    trimmer_logic.trimmer_validate(req, (err, data) => {
        if(err) {
            console.log(err.message)
        } 
        if (data.number == 1) {
            return res.render('trimmer_home', {locals: {name: req.query.trimmer_name, bname: data.barber_name}})
            console.log('option 1')
        } else if (data.number == 2) {
            res.sendFile(`${__dirname}/public/html/wrong_user_trimmer.html`)
        }
    })
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
