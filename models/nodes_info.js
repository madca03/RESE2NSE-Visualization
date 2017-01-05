'use strict';
module.exports = function(sequelize, DataTypes) {
  var NodeInfo = sequelize.define('NodeInfo', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coordinate_set: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define database table name here
    tableName: 'nodes_info',

    classMethods: {
      associate: function(models) {

      }
    }
  });

  return NodeInfo;
};
