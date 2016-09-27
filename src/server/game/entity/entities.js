import Entity from './entity'


var Wizard = function(data) {
    Entity.call(this, Object.assign({
        type: 'Wizard',
        hp: 15,
        mp: 25,
        skills: ['Attack','Heal', 'Thunderbolt']
    }, data));
}
Wizard.prototype.__proto__ = Entity.prototype;

var Rogue = function(data) {
    Entity.call(this, Object.assign({
        type: 'Rogue',
        hp: 20,
        mp: 20,
        skills: ['Attack','Backstab', 'Slash']
    }, data));
}
Rogue.prototype.__proto__ = Entity.prototype;

var Paladin = function(data) {
    Entity.call(this, Object.assign({
        name: data.name,
        type: 'Paladin',
        hp: 27,
        mp: 15,
        skills: ['Attack','Heal', 'Banish Undead']
    }, data));
}
Paladin.prototype.__proto__ = Entity.prototype;


export {Wizard, Rogue, Paladin};
