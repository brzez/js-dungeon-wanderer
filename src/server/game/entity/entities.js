import Entity from './entity'


var Wizard = function(data) {
    Entity.call(this, Object.assign({
        type: 'Wizard',
        hp: 10,
        mp: 15,
        skills: [{type: 'Attack'},{type: 'Heal'}]
    }, data));
}
Wizard.prototype.__proto__ = Entity.prototype;

var Rogue = function(data) {
    Entity.call(this, Object.assign({
        type: 'Rogue',
        hp: 20,
        mp: 10,
        skills: [{type: 'Attack'}]
    }, data));
}
Rogue.prototype.__proto__ = Entity.prototype;

var Paladin = function(data) {
    Entity.call(this, Object.assign({
        name: data.name,
        type: 'Paladin',
        hp: 40,
        mp: 10,
        skills: [{type: 'Attack'}]
    }, data));
}
Paladin.prototype.__proto__ = Entity.prototype;


export {Wizard, Rogue, Paladin};
