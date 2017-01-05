var express = require('express');
var router = express.Router();
var models = require('../../models/index');

router.get('/nodes/display/:archive_date_index', require('./nodes-display.js'));
router.get('/nodes/edit', require('./nodes-edit.js'));
router.post('/nodes/update', require('./nodes-update.js'));
router.get('/nodes/:node_id', require('./node-display.js'));
router.get('/datetime/:type/:range/:last_entry_id', require('./datetime.js'));

router.get('/api/contour', require('./contour.js'));
router.get('/api/temperature', require('./temperature.js'));
router.get('/api/sensors/:sensor_type_id/archive_index/:archive_date_index', require('./sensor.js'));
router.get('/api/sensors/:sensor_type_id/archive/:date_archive_id', require('./sensor-archive.js'));
router.get('/api/archive/date/:date_created_id', require('./graph-archive.js'));

router.get('/get_sensor_data/:multiplier/:group/:resolution', require('../plot/get-sensor-data.js'));


router.get('/contour', require('./display-contour.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home'});
});

router.get('/graph', function(req, res, next) {
  res.render('graph', {title: 'Graph'});
});

router.get('/node_display?', function(req, res, next) {
  var node = req.query;
  res.render('node', {node: node});
});

module.exports = router;
