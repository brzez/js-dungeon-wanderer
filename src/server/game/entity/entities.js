import Entity from './entity'


var Wizard = function(data) {
    Entity.call(this, Object.assign({
        type: 'Wizard',
        hp: 10,
        mp: 5,
        skills: ['Attack','Heal']
    }, data));
}
Wizard.prototype.__proto__ = Entity.prototype;

var Rogue = function(data) {
    Entity.call(this, Object.assign({
        type: 'Rogue',
        hp: 20,
        mp: 10,
        skills: ['Attack','Heal']
    }, data));
}
Rogue.prototype.__proto__ = Entity.prototype;

var Paladin = function(data) {
    Entity.call(this, Object.assign({
        name: data.name,
        type: 'Paladin',
        hp: 40,
        mp: 10,
        skills: ['Attack','Heal']
    }, data));
}
Paladin.prototype.__proto__ = Entity.prototype;


export {Wizard, Rogue, Paladin};
