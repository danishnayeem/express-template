const User = require('../modules/User.js');
var express = require('express');
const Utils = require('../modules/Utils.js');

var rt_basic = express.Router();
var rt_contact = express.Router();
var rt_credentials = express.Router();

var router = express.Router();

rt_basic.post('/', function(req, res, next) {
  User.Basic.Filter(
    req.body
  ).then(res.send.bind(res));
});
rt_basic.post('/Update', function(req, res, next) {
  if( !req.body.prOnId )
    res.send(
      Utils.Response.Error( {
        type : "PARAMETER_NOT_FOUND",
        message : "User id not supplied"
      } )
    );
  else
    User.Basic.Update(
      req.body
    ).then(
      res.send.bind(res)
    );
});
rt_basic.post('/ById/:UserId', function(req, res, next) {
  User.Basic.Filter().then(res.send.bind(res));
});

router.use( '/Basic', rt_basic );


module.exports = router;
