import Entity from './entity'


var Wizard = function(data) {
    Entity.call(this, {
        name: data.name,
        type: 'Wizard',
        hp: 10,
        mp: 15
    });
}
Wizard.prototype.__proto__ = Entity.prototype;

var Rogue = function(data) {
    Entity.call(this, {
        name: data.name,
        type: 'Rogue',
        hp: 20,
        mp: 10
    });
}
Rogue.prototype.__proto__ = Entity.prototype;

var Paladin = function(data) {
    Entity.call(this, {
        name: data.name,
        type: 'Paladin',
        hp: 40,
        mp: 10
    });
}
Paladin.prototype.__proto__ = Entity.prototype;


export {Wizard, Rogue, Paladin};
