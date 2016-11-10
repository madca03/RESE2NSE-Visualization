'use strict';
module.exports = function(sequelize, DataTypes) {
  var sensor_type = sequelize.define('sensor_type', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    min: {
      type: DataTypes.INTEGER
    },
    max: {
      type: DataTypes.INTEGER
    },
    step: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sensor_type;
};
