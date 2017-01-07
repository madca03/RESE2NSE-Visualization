var models = require('../../models/index');
var Promise = require('bluebird');

module.exports = function(req, res, next) {
  var da = req.params.datetime_archive.replace('T', ' ');

  var ca1query = ''
    + 'SELECT DISTINCT(created_at) FROM nodes_data '
    + "WHERE created_at <= '" + da + "' "
    + 'ORDER BY created_at DESC LIMIT 1'
    + ';';

  var ca2query = ''
    + 'SELECT DISTINCT(created_at) FROM nodes_position '
    + "WHERE created_at <= '" + da + "' "
    + 'ORDER BY created_at DESC LIMIT 1'
    + ';';

  Promise.all([
    models.sequelize.query(ca1query, {
      type: models.sequelize.QueryTypes.SELECT
    }).catch(function(err) {
      res.status(500).json({'error': 'error'});
    }),

    models.sequelize.query(ca2query, {
      type: models.sequelize.QueryTypes.SELECT
    }).catch(function(err) {
      res.status(500).json({'error': 'error'});
    })
  ]).then(function(values) {
    var ca1 = values[0][0].created_at.toISOString().slice(0,19).replace('T', ' '); // nodes_data
    var ca2 = values[1][0].created_at.toISOString().slice(0,19).replace('T', ' '); // nodes_position

    var node_query = ''
      + 'SELECT '
        + 'nodes_info.id, '
        + 'nodes_info.label, '
        + 'nodes_info.mac_address, '
        + 'nodes_data.last_transmission, '
        + 'nodes_data.packets_sent, '
        + 'nodes_data.packets_received, '
        + 'nodes_position.x_coordinate, '
        + 'nodes_position.y_coordinate '
      + 'FROM nodes_info '
      + 'INNER JOIN nodes_data '
        + 'ON (nodes_info.id = nodes_data.node_id) '
      + 'INNER JOIN nodes_position '
        + 'ON (nodes_info.id = nodes_position.node_id) '
      + 'INNER JOIN (SELECT node_id, max(created_at) AS created_at, '
        + "min(abs(timediff('" + ca2 + "', created_at))) "
        + 'FROM nodes_position GROUP BY node_id) '
        + 'AS u ON nodes_position.node_id = u.node_id '
        + 'AND nodes_position.created_at = u.created_at '
      + 'INNER JOIN (SELECT node_id, max(created_at) AS created_at, '
        + "min(abs(timediff('" + ca1 + "', created_at))) "
        + 'FROM nodes_data GROUP BY node_id) '
        + 'AS q ON nodes_data.node_id = q.node_id '
        + 'AND nodes_data.created_at = q.created_at '
      + 'WHERE nodes_info.coordinate_set = true '
      + ";";

      var link_query = ''
        + 'SELECT '
          + 'links.source_id, '
          + 'links.target_id, '
          + 'traffic.status '
        + 'FROM links '
        + 'INNER JOIN traffic '
          + 'ON (links.traffic_id = traffic.id) '
        + 'WHERE links.source_id '
          + 'IN (SELECT nodes_info.id '
          + 'FROM nodes_info '
          + 'INNER JOIN nodes_data '
          + 'ON (nodes_info.id = nodes_data.node_id) '
          + 'WHERE nodes_info.coordinate_set = true '
          + "AND nodes_data.created_at = '" + ca1 + "') "
        + 'AND links.target_id '
          + 'IN (SELECT nodes_info.id '
          + 'FROM nodes_info '
          + 'INNER JOIN nodes_data '
          + 'ON (nodes_info.id = nodes_data.node_id) '
          + 'WHERE nodes_info.coordinate_set = true '
          + "AND nodes_data.created_at = '" + ca1 + "') "
        + "AND links.created_at = '" + da + "'"
        + ';';

        Promise.all([
          models.sequelize.query(node_query, {
            type: models.sequelize.QueryTypes.SELECT
          }).catch(function(err) {
            res.status(500).json({'error': err});
          }),

          models.sequelize.query(link_query, {
            type: models.sequelize.QueryTypes.SELECT
          }).catch(function(err) {
            res.status(500).json({'error': err});
          })
        ]).then(function(values) {
          var nodes = values[0];
          var links = values[1];

          var response = {
            'status': 'ok',
            'data': {
              'graph': {
                'nodes': nodes,
                'links': links
              }
            }
          };

          res.json(response);
        });
  });
}
