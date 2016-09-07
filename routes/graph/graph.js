var express = require('express');
var router = express.Router();
var models = require('../../models/index');

router.get('/graph', function(req, res, next) {
  var query = "SELECT COUNT(*) FROM floors";

  models.sequelize.query(query, {type: models.sequelize.QueryTypes.SELECT })
    .then(function(count) {
      var floorCount = count[0]["COUNT(*)"];

      res.render('graph', {title: 'Graph', floorCount: floorCount})
    });
});

module.exports = router;
