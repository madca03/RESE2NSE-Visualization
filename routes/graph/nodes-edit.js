var models = require('../../models/index');

/* This route is called when an admin user would like to edit the graph.
  This route returns all of the nodes.

  In editing the nodes, the admin user is only concerned with
  the nodes and not on the links that's why we return only the nodes.
  (BASTA NODES LANG IPASA hahaha haba pa ng sinabi ko.)
*/

module.exports = function(req, res, next) {
  // http://stackoverflow.com/questions/1140064/sql-query-to-get-most-recent-row-for-each-instance-of-a-given-key
  var node_query = ''
    + 'SELECT '
      + 'nodes_info.id, '
      + 'nodes_info.label, '
      + 'nodes_info.coordinate_set AS fixed, '
      + 'nodes_info.coordinate_set, '
      + 'nodes_position.x_coordinate AS x, '
      + 'nodes_position.y_coordinate AS y '
    + 'FROM nodes_info '
    + 'INNER JOIN nodes_position '
      + 'ON (nodes_info.id = nodes_position.node_id) '
    + 'INNER JOIN (SELECT node_id, max(created_at) as created_at FROM nodes_position '
      + 'GROUP BY node_id) AS q ON nodes_position.node_id = q.node_id '
      + 'AND nodes_position.created_at = q.created_at'
    + ';';

  models.sequelize.query(node_query, { type: models.sequelize.QueryTypes.SELECT })  // Query all the nodes
    .then(function(nodes) {
        var response = {
          'status': 'ok',
          'data': {
            'graph': {
              'nodes': nodes
            }
          }
        };

        res.json(response);
    });
}
