var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Server01.',
    database: 'gotham_motor_inc'
});

conn.connect((err) => {
    if(!err)
        console.log('connected to database successfully');
    else    
        console.log('connection failed' + JSON.stringify(err, undefined, 2));
}); 

module.exports = conn;