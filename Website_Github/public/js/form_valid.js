const sqlite3 = require('sqlite3-promise')
DBName = 'barber_data'

const runAsync = sql => new Promise( (resolve, reject) => {
	const db = new sqlite3.Database(`${DBName}.db`)
	db.run(sql, err => {
		if(err) return reject(new Error(err.message))
		resolve()
	})
	db.close()
})

function validateForm() {
    let username = document.getElementById("barber_form.").barber_id.value
    let passwords = document.getElementById("barber_form.").barber_pass.value
    const db = new sqlite3.database(`${barber_data}.db`, (err) => {
        if (err) {
            console.error(err.message);
        }
    console.log('Connected to the barber_data database')
    })
    const pass = db.allAsync(`SELECT password WHERE user_name = "${username}"`)
    console.log(pass)
    checker = false
    if (pass == passwords) {
        checker = true
        res.redirect('/barber')
    } else {
        throw new error('wrong password or connection');
    }
    }