describe('catalogx.rest', function () {
    var config, component, rest, payload, params, success;

    beforeEach(module('catalogx.gateway'));
    beforeEach(inject(function (restServiceHandler, config) {
        rest = restServiceHandler;
        exposeConfig(config);
        config.baseUri = 'http://host/'
    }));

    function exposeConfig(it) {
        config = it;
    }

    function spyOnRest() {
        payload = rest.calls.first().args[0];
        params = rest.calls.first().args[0].params;
        success = rest.calls.first().args[0].success;
    }

    describe('update catalog item writer', function () {
        var args = {
            data: {
                id: 'item-id',
                context: 'update-id'
            },
            success: jasmine.createSpy('onSuccessSpy')
        };

        beforeEach(inject(function (updateCatalogItemWriter) {
            component = updateCatalogItemWriter;
        }));

        it('updates without baseUri', function () {
            config.baseUri = undefined;
            component(args);
            spyOnRest();
            expect(params.url).toEqual('api/entity/catalog-item');
        });

        describe('on execute', function () {
            beforeEach(function () {
                component(args);
                spyOnRest();
            });

            it('perform rest call', function () {
                expect(payload).toEqual(args);
                expect(params.method).toEqual('POST');
                expect(params.withCredentials).toEqual(true);
                expect(params.url).toEqual('http://host/api/entity/catalog-item');
                expect(params.data).toEqual(args.data);
            });

            it('installed on success handler', function () {
                success();
                expect(success.calls.first()).toBeTruthy();
            });
        });
    });
});
