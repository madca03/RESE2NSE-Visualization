var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/floor/:floor_number', require('./nodes/nodes-edit.js'));
router.get('/archive/floor/:floor_number/date/:date_created_id', require('./graph/floor-archive.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home'});
});

router.get('/sample', function(req, res, next) {
  res.render('sample', {title: 'Home'});
});

router.get('/settings', function(req, res, next) {
  res.render('settings', {title: 'Settings'});
});

router.get('/api/sensors', function(req, res, next) {
  var query = 'SELECT * FROM sensor_type;';

  models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function(sensor_types) {
      var response = {
        'status': 'ok',
        'data': {
          'sensor_types': sensor_types
        }
      };

      res.json(response);
    });
});

router.post('/api/sensors/:id', function(req, res, next) {
  var minVal = req.body.minVal;
  var maxVal = req.body.maxVal;
  var stepVal = req.body.stepVal;

  var query = ''
    + 'UPDATE sensor_type '
    + 'SET min = ' + minVal + ', '
    + 'max = ' + maxVal + ', '
    + 'step = ' + stepVal + ' '
    + 'WHERE id = ' + req.params.id + ';';

  models.sequelize.query(query, { type: models.sequelize.QueryTypes.UPDATE })
    .then(function() {
    });

  res.send({});
});


router.get('/node/:node_id', function(req, res, next) {
  var query = ''
    + 'SELECT '
      + 'nodes.label, '
      + 'nodes.mac_address, '
      + 'nodes.floor_id, '
      + 'sensors.type, '
      + 'nodes_present.x_coordinate, '
      + 'nodes_present.y_coordinate, '
      + 'nodes_present.last_transmission, '
      + 'nodes_present.packets_sent, '
      + 'nodes_present.packets_received '
    + 'FROM nodes '
    + 'INNER JOIN nodes_present '
      + 'ON (nodes.id = nodes_present.node_id) '
    + 'INNER JOIN sensors '
      + 'ON (nodes.sensor_id = sensors.id) '
    + 'WHERE nodes.id = ' + req.params.node_id + ';';

  // var nodeQuery = "SELECT * FROM nodes WHERE node_id=" + "'" + nodeID + "'" + ";";

  models.sequelize.query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function(nodes) {
      var node = nodes[0];
      res.render('node', {node: node});
    });
});


module.exports = router;
