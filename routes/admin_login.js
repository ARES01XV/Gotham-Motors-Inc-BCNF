var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//GET Admin Page
// router.get('/', function(req, res, next) {
//   res.render('admin_login'  );
// });

//Admin login
router.post('/', (req,res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    conn.querry('SELECT * FROM gotham_motor_inc.admins WHERE email = ? AND BINARY password = ?', [email, password], (err, results, fields) => {

        // if login is incorrect or not found
        if(results.length <= 0) {
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