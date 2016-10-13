'use strict';
module.exports = function(sequelize, DataTypes) {
  var nodes_present = sequelize.define('nodes_present', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    node_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    x_coordinate: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    y_coordinate: {
      allowNull: false,
      type: DataTypes.DOUBLE
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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    }
  });
  return nodes_present;
};
