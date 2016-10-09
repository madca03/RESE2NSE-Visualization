var express = require('express');
var router = express.Router();

var the_res = {"10mins":"10 mins", "1hr":"1 hr", "3hrs":"3 hrs", "6hrs":"6 hrs", "12hrs":"12 hrs", "1day":"1 day"};

router.get('/:node_group/:time_res', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: the_res[req.params["time_res"]], group: req.params["node_group"]});
});
/*
router.get('/1hr', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '1 hr'});
});

router.get('/3hrs', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '3 hrs'});
});

router.get('/6hrs', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '6 hrs'});
});

router.get('/12hrs', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '12 hrs'});
});

router.get('/1day', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '1 day'});
});
*/
module.exports = router;
