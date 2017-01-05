'use strict';
module.exports = function(sequelize, DataTypes) {
  var nodes_data = sequelize.define('nodes_data', {
    node_id: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    freezeTableName: true,
    tableName: 'nodes_data',

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
    }
  });
  return nodes_data;
};
