var models = require('../../models/index');
var Promise = require('bluebird');

/* This route is being called by an ajax call when the application is in user view mode.
  It returns a JSON data containing the nodes having a defined x and y coordinates
  and links having defined source and target coordinates.
*/
module.exports =  function(req, res, next) {
  // http://stackoverflow.com/questions/1140064/sql-query-to-get-most-recent-row-for-each-instance-of-a-given-key

  var nodes_query = ''
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
      + 'ON nodes_info.id = nodes_data.node_id '
    + 'INNER JOIN nodes_position '
      + 'ON nodes_info.id = nodes_position.node_id '
    + 'INNER JOIN (SELECT node_id, max(created_at) as created_at '
      + 'FROM nodes_position GROUP BY node_id) '
      + 'AS u ON nodes_position.node_id = u.node_id '
      + 'AND nodes_position.created_at = u.created_at '
    + 'INNER JOIN (SELECT node_id, max(created_at) as created_at '
      + 'FROM nodes_data GROUP BY node_id) '
      + 'AS q ON nodes_data.node_id = q.node_id '
      + 'AND nodes_data.created_at = q.created_at '
    + 'WHERE nodes_info.coordinate_set = true'
    + ';';

  var links_query = ''
    + 'SELECT '
      + 'links.source_id, '
      + 'links.target_id, '
      + 'traffic.status '
    + 'FROM links '
    + 'INNER JOIN traffic '
      + 'ON (links.traffic_id = traffic.id) '
    + 'WHERE links.source_id '
      + 'IN (SELECT id FROM nodes_info WHERE coordinate_set = true) '
    + 'AND links.target_id '
      + 'IN (SELECT id FROM nodes_info WHERE coordinate_set = true) '
    + 'AND links.created_at '
      + 'IN (SELECT max(created_at) FROM links) '
    + ';';

  var date_archive_query = ''
    + 'SELECT DISTINCT(created_at) '
    + 'AS datetime_archive '
    + 'FROM links '
    + "WHERE created_at > '" + req.params.archive_date.replace('T', ' ') + "'"
    + ';';

    models.sequelize.query(links_query, {
      type: models.sequelize.QueryTypes.SELECT
    }).then(function(nodes) {
      res.send(nodes);
      // models.sequelize.query(links_query, {
      //   type: models.sequelize.QueryTypes.SELECT
      // }).then(function(links) {
        // models.sequelize.query(date_archive_query, {
        //   type: models.sequelize.QueryTypes.SELECT
        // }).then(function(date_archive) {
        //   var response = {
        //     'status': 'ok',
        //     'data': {
        //       'graph': {
        //         'nodes': nodes,
        //         'links': links,
        //         'date_archive': date_archive,
        //         'date_archive_count': date_archive.length
        //       }
        //     }
        //   };
        //
        //   res.json(response);
        // });
      // });
    });

  // Promise.all([
  //   models.sequelize.query(nodes_query, {
  //     type: models.sequelize.QueryTypes.SELECT
  //   }),
  //   models.sequelize.query(links_query, {
  //     type: models.sequelize.QueryTypes.SELECT
  //   }),
  //   models.sequelize.query(date_archive_query, {
  //     type: models.sequelize.QueryTypes.SELECT
  //   })
  // ]).then(function(values) {
  //   var nodes = values[0];
  //   var links = values[1];
  //   var date_archive = values[2];
  //
  //   var response = {
  //     'status': 'ok',
  //     'data': {
  //       'graph': {
  //         'nodes': nodes,
  //         'links': links,
  //         'date_archive': date_archive,
  //         'date_archive_count': date_archive.length
  //       }
  //     }
  //   };
  //
  //   res.json(response);
  // });
}
