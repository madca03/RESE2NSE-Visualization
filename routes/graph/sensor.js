var models = require('../../models/index');

module.exports = function(req, res, next) {
  var node_query = ''
    + 'SELECT '
      + 'nodes.id, '
      + 'nodes.label, '
      + 'nodes.mac_address, '
      + 'nodes.floor_id, '
      + 'nodes_present.x_coordinate, '
      + 'nodes_present.y_coordinate, '
      + 'nodes_present.last_transmission, '
      + 'nodes_present.packets_sent, '
      + 'nodes_present.packets_received, '
      + 'sensor_data.value '
    + 'FROM nodes '
    + 'INNER JOIN nodes_present '
      + 'ON (nodes.id = nodes_present.node_id) '
    + 'INNER JOIN sensor_data '
      + 'ON (nodes.id = sensor_data.node_id) '
    + 'WHERE nodes.coordinate_set = true '
      + 'AND sensor_data.sensor_type_id = '
      + req.params.sensor_type_id + ' '
    + 'ORDER BY sensor_data.value ASC'
    + ';';

    var archive_date_query = 'SELECT id, datetime_archive '
      + 'FROM datetime_archive '
      + 'WHERE id >= ' + req.params.archive_date_index + ';';

  models.sequelize.query(node_query, { type: models.sequelize.QueryTypes.SELECT })
    .then(function(nodes) {
      models.sequelize.query(archive_date_query, { type: models.sequelize.QueryTypes.SELECT })
        .then(function(date_archive) {
          var response = {
            'status': 'ok',
            'data': {
              'nodes': nodes,
              'nodes_length': nodes.length,
              'date_archive': date_archive,
              'date_archive_count': date_archive.length
            }
          };

          res.json(response);
        });
    });
};
