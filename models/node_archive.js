'use strict';
module.exports = function(sequelize, DataTypes) {
  var Node_archive = sequelize.define('Node_archive', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    node_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    x_coordinate: {
      type: DataTypes.DOUBLE,
      defaultValue: null
    },
    y_coordinate: {
      type: DataTypes.DOUBLE,
      defaultValue: null
    },
    last_transmission: {
      allowNull: false,
      type: DataTypes.STRING
    },
    packets_sent: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    packets_received: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    date_created_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Node_archive;
};
