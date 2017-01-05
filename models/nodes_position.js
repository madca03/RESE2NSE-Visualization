'use strict';
module.exports = function(sequelize, DataTypes) {
  var nodes_position = sequelize.define('nodes_position', {
    node_id: DataTypes.INTEGER,
    x_coordinate: DataTypes.DOUBLE,
    y_coordinate: DataTypes.DOUBLE,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return nodes_position;
};
