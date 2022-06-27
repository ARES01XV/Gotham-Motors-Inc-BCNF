var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

//Get admin page
// router.get('/', (req, res, next) => {
//     res.render('admin',
//     {title: 'Admin'});
// });

// SELECT customers.cust_id, customers.cust_name, customers.cust_address, cars.car_id, cars.car_name, cars.manufacturer, cars.price, cars.release_year FROM customers JOIN cars ON customers.cust_id = 1140 AND cars.car_id = 2

//Admin Page
router.get('/', (req, res) => {
if(req.session.loggedin === true) {
    // conn.query('SELECT * FROM purchases, customers, cars WHERE purchases.cust_id = customers.cust_id AND purchases.car_id = cars.car_id; ', (err, rows) => {
    conn.query('SELECT customers.cust_id, customers.cust_name, customers.cust_address, cars.car_id, cars.car_name, cars.manufacturer, cars.price, cars.release_year FROM customers JOIN cars ON customers.cust_id = 1140 AND cars.car_id = 2', (err, rows) => {
        if(err){
            res.render('admin', {
                title: 'Admin', purchases: ''
            });
        } else {
            res.render('admin', {
                title: 'Admin', purchases: rows
            });
        }
    });
} else {
    res.redirect('/admin_login')
}
});


// **************** LOG OUT **************************************
router.get('/admin_logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin_login')
});


module.exports = router;