'use strict';
module.exports = function(sequelize, DataTypes) {
  var Datetime_archive = sequelize.define('datetime_archive', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    datetime_archive: {
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
  return Datetime_archive;
};
