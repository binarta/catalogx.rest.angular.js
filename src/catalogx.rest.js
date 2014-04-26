angular.module('catalogx.gateway', ['rest.client', 'config'])
    .factory('updateCatalogItemWriter', ['restServiceHandler', 'config', UpdateCatalogItemWriterFactory]);

function UpdateCatalogItemWriterFactory(restServiceHandler, config) {
    return function (args) {
        args.params = {
            method: 'POST',
            withCredentials: true,
            url: (config.baseUri || '') + 'api/entity/catalog-item',
            data: args.data
        };
        restServiceHandler(args);
    }
}