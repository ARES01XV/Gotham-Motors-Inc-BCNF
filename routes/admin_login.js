var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//GET Admin Login
router.get('/', function (req, res, next) {
    res.render('admin_login');
});

//Admin login
router.post('/adlog', (req, res, next) => {

    email = req.body.email;
    password = req.body.password;

    conn.query('SELECT * FROM gotham_motor_inc.admins WHERE admin_email = ? AND BINARY password = ?',
        [email, password], (err, results) => {

            console.log(results)
            // if login is incorrect or not found
            if (results.length <= 0) {
                req.flash('error', 'Invalid credentials please try again!')
                res.redirect('/admin_login')
            } else { // if login found
                // Assign session variables based on login 
                req.session.loggedin = true;
                req.session.adminId = results[0].admin_id;
                req.session.firstName = results[0].frst_nm;
                req.session.lastName = results[0].last_nm;
                res.redirect('/admin');
            }
        })
});


module.exports = router;