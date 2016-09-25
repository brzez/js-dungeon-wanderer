import {assert} from 'chai';

import Entity from '../../../../src/server/game/entity/entity.js'

describe('Entity', () => {
    describe('constructor', function() {
        it('should normalize hp / mp data structure', function() {
            var e = new Entity({type: 'test', hp: 10, mp: 15});
            assert.deepEqual(e.data.hp, {max: 10, current: 10});
            assert.deepEqual(e.data.mp, {max: 15, current: 15});
        })
        it('data.items should be an array', function() {
            var e = new Entity({type: 'test'});
            assert.isArray(e.data.items);
        })
        it('data.skills should be an array', function() {
            var e = new Entity({type: 'test'});
            assert.isArray(e.data.skills);
        })
        it('data.type always needs to be defined', function() {
            assert.throws(function() {
                var e = new Entity({});
            }, Error);
        })
        it('data.name should be data.type if not defined', function() {
            let a = new Entity({type: 'foo'});
            assert.equal(a.data.name, 'foo');
            let b = new Entity({type: 'foo', name: 'bar'});
            assert.equal(b.data.name, 'bar');
        })
    })
    describe('#getData', function() {
        it('should return normalized data object', function() {
            var e = new Entity({type: 'test', hp: 10, mp: 15});
            var data = e.getData();
            assert.deepEqual(data.hp, {max: 10, current: 10});
            assert.deepEqual(data.mp, {max: 15, current: 15});
        })
    })
    describe('#serialize', function() {
        it('should return serialized data', function() {
            var e = new Entity({type: 'test', hp: 10, mp: 15});
            var serialized = e.serialize();
            assert.deepEqual(serialized, {
                type: 'test',
                hp: {current: 10, max: 10},
                mp: {current: 15, max: 15},
                items: [],
                skills: []
            });
        })
    })
});
