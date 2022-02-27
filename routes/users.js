const User = require('../modules/User.js');
var express = require('express');

var rt_basic = express.Router();
var rt_contact = express.Router();
var rt_credentials = express.Router();

var router = express.Router();

rt_basic.get('/', function(req, res, next) {
  User.Basic.Filter({
    prProjectAuth : "abcd"
  }).then(
    (rs)=>{
    res.send(rs)
    }
  );
});
rt_basic.get('/Update', function(req, res, next) {
  User.Basic.Filter({
    prProjectAuth : "abcd"
  }).then(
    (rs)=>{
    res.send(rs)
    }
  );
});
rt_basic.get('/UpdateGender', function(req, res, next) {
  res.send( User.Basic.Filter() );
});

router.use( '/Basic', rt_basic );


module.exports = router;
