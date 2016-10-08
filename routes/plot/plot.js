var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('plot', {title: 'Plot', resolution: '10 mins'});
});

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

module.exports = router;
