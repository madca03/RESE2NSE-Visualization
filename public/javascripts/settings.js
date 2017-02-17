var app = angular.module('app', [])

app.controller('SettingsController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/sensors').then(function(res) {
    $scope.sensorTypes = res.data.data.sensor_types;
    // $scope.sensorTypes.push({type: 'Select sensor', disabled:true});
    // $scope.selectedSensor = $scope.sensorTypes[$scope.sensorTypes.length - 1];
    // $scope.disableOption();
    console.log(typeof $scope.selectedSensor);
  });

  $scope.updateSensorType = function() {
    if (!$scope.minVal || !$scope.maxVal || !$scope.stepVal || !$scope.selectedSensor || ($scope.maxVal < $scope.minVal)) {
      console.log('incomplete arguments');
    } else {
      $http.post('/api/sensors/' + $scope.selected.id + '/', {
        'minVal': $scope.minVal,
        'maxVal': $scope.maxVal,
        'stepVal': $scope.stepVal
      }).then(function(res) {
        $scope.minVal = null;
        $scope.maxVal = null;
        $scope.stepVal = null;
        $scope.selectedSensor = 'Select Sensor';
        console.log("updated");
        console.log(res);
      });
    }
  };
}]);

// app.directive('saveAlert', function() {
//
// });
