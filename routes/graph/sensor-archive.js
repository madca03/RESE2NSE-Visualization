var models = require('../../models/index');

module.exports = function(req, res, next) {
  var node_query = ''
    + 'SELECT '
      + 'nodes.id, '
      + 'nodes.label, '
      + 'nodes.mac_address, '
      + 'nodes_archive.x_coordinate, '
      + 'nodes_archive.y_coordinate, '
      + 'nodes_archive.last_transmission, '
      + 'nodes_archive.packets_sent, '
      + 'nodes_archive.packets_received, '
      + 'sensor_data_archive.value '
    + 'FROM nodes '
    + 'INNER JOIN nodes_archive '
      + 'ON (nodes.id = nodes_archive.node_id) '
    + 'INNER JOIN sensor_data_archive '
      + 'ON (nodes.id = sensor_data_archive.node_id) '
    + 'WHERE nodes.coordinate_set = true '
    + 'AND sensor_data_archive.sensor_type_id = ' + req.params.sensor_type_id + ' '
    + 'AND sensor_data_archive.date_created_id = ' + req.params.date_archive_id + ' '
    + 'AND nodes_archive.date_created_id = ' + req.params.date_archive_id + ' '
    + 'ORDER BY sensor_data_archive.value ASC'
    + ';';

  var sensor_query = ''
    + 'SELECT * FROM sensor_type WHERE id = ' + req.params.sensor_type_id + ';';

  models.sequelize.query(node_query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function(nodes) {
      models.sequelize.query(sensor_query, { type: models.sequelize.QueryTypes.SELECT })
        .then(function(sensor) {
          var response = {
            'status': 'ok',
            'data': {
              'nodes': nodes,
              'nodes_length': nodes.length,
              'sensor': sensor[0]
            }
          };

          res.json(response);
        });
    });
};
