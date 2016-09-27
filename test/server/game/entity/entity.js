import {assert, expect} from 'chai';

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
            var e = new Entity({type: 'test', name: 'foo', hp: 10, mp: 15});
            var serialized = e.serialize();
            assert.deepEqual(serialized, {
                name: 'foo',
                type: 'test',
                hp: {current: 10, max: 10},
                mp: {current: 15, max: 15},
                items: [],
                skills: []
            });
        })
    })
    describe('#addHealth', function() {
        it('should max out on maximum hp', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: {current: 20, max: 30}, mp: 15});
            assert.equal(e.data.hp.current, 20);
            e.addHealth(300);
            assert.equal(e.data.hp.current, 30);
        })
    })
    describe('#removeHealth', function() {
        it('should prevent from going lower than 0', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: {current: 20, max: 30}, mp: 15});
            assert.equal(e.data.hp.current, 20);
            e.removeHealth(300);
            assert.equal(e.data.hp.current, 0);
        })
    })
    describe('#addMana', function() {
        it('should max out on maximum hp', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: 10, mp: {current: 20, max: 30}});
            assert.equal(e.data.mp.current, 20);
            e.addMana(300);
            assert.equal(e.data.mp.current, 30);
        })
    })
    describe('#removeMana', function() {
        it('should prevent from going lower than 0', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: 10, mp: {current: 20, max: 30}});
            assert.equal(e.data.mp.current, 20);
            e.removeMana(300);
            assert.equal(e.data.mp.current, 0);
        })
    })
    describe('#isAlive', function() {
        it('should check if hp neq 0', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: {current: 22, max: 30}, mp: 15});
            assert.equal(e.data.hp.current, 22);
            assert.equal(e.isAlive(), true);
            e.removeHealth(2000);
            assert.equal(e.isAlive(), false);
        })
    })
    describe('#isManaAvailable', function() {
        it('should check if mana >= amount', function() {
            var e = new Entity({type: 'test', name: 'foo', hp: {current: 22, max: 30}, mp: 15});
            assert.equal(e.isManaAvailable(10), true);
            e.removeMana(10);
            assert.equal(e.isManaAvailable(10), false);
        })
    })
    describe('#useItemById', function() {
        it('should get items with generated ID', function() {
            var e = new Entity({
                type: 'test', name: 'foo', hp: 10, mp: 15,
                items: ['Mana Potion', 'Health Potion']
            });

            assert.isTrue(e.useItemById(1));
            expect(e.data.items).to.not.include({type: 'Mana Potion'})
        })
    })
    describe('#getInventory', function() {
        it('should get items with generated ID', function() {
            var e = new Entity({
                type: 'test', name: 'foo', hp: 10, mp: 15,
                items: ['Mana Potion', 'Health Potion']
            });


            let inv = e.getInventory();

            assert.lengthOf(inv, 2);
            let id = 0;
            inv.forEach((item)=>{
                expect(item).to.deep.include({
                    id: ++id
                })
            })
        })
    })
});
