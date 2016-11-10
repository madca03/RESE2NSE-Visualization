var app = angular.module('app', []);

app.controller('SettingsController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/sensors').success(function(res) {
    $scope.sensorTypes = res.data.sensor_types;
  });

  $scope.updateSensorType = function() {
    $http.post('/api/sensors/' + $scope.selected.id + '/', {
      'minVal': $scope.minVal,
      'maxVal': $scope.maxVal,
      'stepVal': $scope.stepVal
    }).success(function(res) {
      console.log("updated");
      console.log(res);
    });
  };
}]);
