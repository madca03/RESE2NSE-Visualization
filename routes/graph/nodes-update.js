var models = require('../../models/index');
var Promise = require('bluebird');
var async = require('async');

module.exports =  function(req, res, next) {
  var nodes = JSON.parse(req.body.nodes);
  var curr_date = new Date();
  curr_date = curr_date.toISOString().slice(0, 19).replace('T', ' ');

  var insert_query = ''
    + 'INSERT INTO nodes_position '
    + 'VALUES (?, ?, ?, ?)'
    + ';';

  var update_query = ''
    + 'UPDATE nodes_info '
    + 'SET coordinate_set=true '
    + 'WHERE id=?'
    + ';';

// http://stackoverflow.com/questions/34596123/asynchronous-response-into-a-loop-in-javascript-nodejs
  async.forEachOf(nodes, function iterator(node, index, callback) {
    if (!node.coordinate_set) {
      Promise.all([
        models.sequelize.query(update_query, {
          replacements: [
            node.id
          ],
          type: models.sequelize.QueryTypes.UPDATE
        }).catch(function(error) {
          callback(error);
        }),

        models.sequelize.query(insert_query, {
          replacements: [
            node.id,
            node.x_coordinate,
            node.y_coordinate,
            curr_date
          ],
          type: models.sequelize.QueryTypes.INSERT
        }).catch(function(error) {
          callback(error);
        })

      ]).then(function() {
        callback();
      });
    } else {
      models.sequelize.query(insert_query, {
        replacements: [
          node.id,
          node.x_coordinate,
          node.y_coordinate,
          curr_date
        ],
        type: models.sequelize.QueryTypes.INSERT
      }).then(function() {
        callback();
      }).catch(function(error) {
        callback(error);
      });
    }
  }, function(err) {
    if (err) {
      console.log(err);
      res.status(500).json({'error': 'error'});
    }
    res.json({'status':'ok'});
  });
}
