import {assert} from 'chai';

import Factory from '../../../../src/server/game/entity/factory.js'

describe('Factory', () => {
    describe('#create', function() {
        it('should resolve entity using the resolver', function() {
            var factory = new Factory();
            factory.register('test', function(data) {
                return data;
            });
            var data = {a: 123};
            var resolved = factory.create('test', data);
            assert.equal(resolved, data);
        })
        it('should should throw if resolver not registered', function() {
            var factory = new Factory();
            assert.throws(function() {
                factory.create('not registered type');
            }, Error);
        })
    });
});
