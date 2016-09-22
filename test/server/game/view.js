import {assert} from 'chai';

import View from '../../../src/server/game/view'

describe('View', () => {
    describe('#toJson', function() {
        it('Should return json serialized view', () => {
            var v = new View('view_name', {a: 'foo', b: 'bar'});
            var json = v.toJson();

            assert.typeOf(json, 'string');
            var o = JSON.parse(json);
            
            assert.equal(o.template, 'view_name');
            assert.equal(o.data.a, 'foo');
            assert.equal(o.data.b, 'bar');
        }); 
    });
});
