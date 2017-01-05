'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link = sequelize.define('links', {
    source_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    target_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    traffic_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    floor_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    created_at: {
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
  return Link;
};
