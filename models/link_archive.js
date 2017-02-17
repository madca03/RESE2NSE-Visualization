'use strict';
module.exports = function(sequelize, DataTypes) {
  var Link_archive = sequelize.define('links_archive', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    link_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
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
    date_created_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Link_archive;
};
