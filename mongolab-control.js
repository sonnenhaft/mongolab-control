angular.module('mongolab-control', [
    'mongolab-factory'
]).directive('mongolabControl', function(mongolabFactory, mongolabConfigs){
    return {
        templateUrl: 'mongolab-control.html',
        link:  function ($scope) {
            $scope.testCollection = mongolabFactory.query();

            $scope.mongolabConfigs = mongolabConfigs;

            $scope.add = function () {
                var item = {name: $scope.nameToAdd, value: $scope.valueToAdd};
                mongolabFactory.save(item).$promise.then(function (resource) {
                    item._id = resource._id;
                    $scope.testCollection.push(item);
                    $scope.nameToAdd = null;
                    $scope.valueToAdd = null;
                });
            };

            $scope.remove = function (item) {
                $scope.testCollection.splice($scope.testCollection.indexOf(item), 1);
                mongolabFactory.remove({id: item._id.$oid});
            };

            $scope.update = function (item) {
                mongolabFactory.update({id: item._id.$oid}, item);
            }
        }
    }
});