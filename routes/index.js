var express = require('express');
var conn = require('../lib/db');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {title: 'Home'});
});

module.exports = router;
