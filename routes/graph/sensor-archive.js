var models = require('../../models/index');

module.exports = function(req, res, next) {
  var node_query = ''
    + 'SELECT '
      + 'nodes.id, '
      + 'nodes.label, '
      + 'nodes.mac_address, '
      + 'nodes.floor_id, '
      + 'nodes_archive.x_coordinate, '
      + 'nodes_archive.y_coordinate, '
      + 'nodes_archive.last_transmission, '
      + 'nodes_archive.packets_sent, '
      + 'nodes_archive.packets_received, '
      + 'sensor_data.value '
    + 'FROM nodes '
    + 'INNER JOIN nodes_archive '
      + 'ON (nodes.id = nodes_archive.node_id) '
    + 'INNER JOIN sensor_data '
      + 'ON (nodes.id = sensor_data.node_id) '
    + 'WHERE nodes.coordinate_set = true '
    + 'AND sensor_data.sensor_type_id = ' + req.params.sensor_type_id + ' '
    + 'AND nodes_archive.date_created_id = ' + req.params.date_archive_id + ' '
    + 'ORDER BY sensor_data.value ASC'
    + ';';

  models.sequelize.query(node_query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function(nodes) {
      var response = {
        'status': 'ok',
        'data': {
          'nodes': nodes,
          'nodes_length': nodes.length
        }
      };

      res.json(response);
    });
};
