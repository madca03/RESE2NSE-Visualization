var models = require('../../models/index');

/* This route is being called by an ajax call when the application is in view mode.
  It returns a JSON data containing the nodes having a defined x and y coordinates
  and edges having defined source and target coordinates.
*/
module.exports =  function(req, res, next) {
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
      + 'nodes_present.packets_received '
    + 'FROM nodes '
    + 'INNER JOIN nodes_present '
      + 'ON (nodes.id = nodes_present.node_id) '
    + 'WHERE nodes.coordinate_set = true;';

  var link_query = ''
    + 'SELECT '
      + 'links_present.id, '
      + 'links_present.source_id, '
      + 'links_present.target_id, '
      + 'links_present.floor_id, '
      + 'traffic.status '
    + 'FROM links_present '
    + 'INNER JOIN traffic '
      + 'ON (links_present.traffic_id = traffic.id) '
    + 'WHERE links_present.source_id '
      + 'IN (SELECT id FROM nodes WHERE coordinate_set = true) '
    + 'AND links_present.target_id '
      + 'IN (SELECT id FROM nodes WHERE coordinate_set = true);';

  var archive_date_query = 'SELECT id, datetime_archive '
    + 'FROM datetime_archive '
    + 'WHERE id >= ' + req.params.archive_date_index + ';';

  models.sequelize.query(node_query, { type: models.sequelize.QueryTypes.SELECT })  // Query the nodes
    .then(function(nodes) {
      models.sequelize.query(link_query, { type: models.sequelize.QueryTypes.SELECT })  // Query the edges
        .then(function(links) {
          models.sequelize.query(archive_date_query, { type: models.sequelize.QueryTypes.SELECT }) // Query the archive_count
            .then(function(date_archive) {
              var response = {
                'status': 'ok',
                'data' : {
                  'graph': {
                    'nodes': nodes,
                    'links': links,
                  },
                  'date_archive': date_archive,
                  'date_archive_count': date_archive.length,
                }
              }

              res.json(response);  // send graph data as JSON
            });
        });
    });
}
