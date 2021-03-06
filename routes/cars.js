var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


//Car Page
router.get('/', (req, res) => {
if(req.session.loggedin === true) {
    conn.query('SELECT * FROM gotham_motor_inc.cars', 
    (err, rows) => {
        console.log(rows)
        if(err){
            res.render('cars', {
                title: 'Cars', cars: ''
            });
        } else {
            res.render('cars', {
                title: 'Cars', cars: rows
            });
        }
    });
} else {
    res.redirect('/customer_login')
}
});

// **************** LOG OUT **************************************
router.get('/customer_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/customer_login')
});

module.exports = router;