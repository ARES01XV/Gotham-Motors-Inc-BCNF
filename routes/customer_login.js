var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//GET Customer Login
router.get('/', function(req, res, next) {
  res.render('customer_login');
});

//Customer login
router.post('/custlogin', (req,res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    conn.query('SELECT * FROM gotham_motor_inc.customers WHERE email = ? AND BINARY password = ?', [email, password], (err, results, fields) => {

        // if login is incorrect or not found
        if(results.length <= 0) {
            req.flash('error', 'Invalid credentials please try again!')
            res.redirect('/customer_login')
        } else { // if login found
            // Assign session variables based on login 
            req.session.loggedin = true;
            req.session.customerId = results[0].cust_id;
            req.session.customerName = results[0].cust_name;
            res.redirect('/cars');
        }
    })
});

module.exports = router;