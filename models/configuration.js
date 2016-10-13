'use strict';
module.exports = function(sequelize, DataTypes) {
  var Configuration = sequelize.define('Configuration', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    base_browser_width: {
      type: DataTypes.DOUBLE
    },
    base_graph_container_width: {
      type: DataTypes.DOUBLE
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Configuration;
};
