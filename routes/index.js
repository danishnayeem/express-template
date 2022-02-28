const Utils = require( '../modules/Utils' );
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.send( Utils.Config.LogValues );
});

module.exports = router;
