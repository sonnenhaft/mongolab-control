angular.module('mongolab-factory', [
    'ngResource'
]).provider('mongolabFactory', function (mongolabConfigs) {
    this.setConfigs = function (_mongolabConfigs) {
        angular.extend(mongolabConfigs, _mongolabConfigs);
    };

    this.$get = function ($resource) {
        var c = mongolabConfigs;
        var url = [c.mongolabUrl, c.dataBase, 'collections', c.collection, ':id'].join('/');
        return $resource(url, {apiKey: c.apiKey}, {
            update: {method: 'PUT'}
        });
    };

}).constant('mongolabConfigs',  {
    mongolabUrl: 'https://api.mongolab.com/api/1/databases',
    collection: 'test-collection2',
    dataBase: null,
    apiKey: null
});