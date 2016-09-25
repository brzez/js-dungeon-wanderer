import Entity from './entity'


var Wizard = function() {
    Entity.call(this, {
        type: 'Wizard',
        hp: 10,
        mp: 15,
        skills: {
            'attack': function(self, enemy) {
                console.log('AIEIEIEOE !!')
            }
        }
    });
}
Wizard.prototype.__proto__ = Entity.prototype;

var Rogue = function() {
    Entity.call(this, {
        type: 'Rogue',
        hp: 20,
        mp: 10
    });
}
Rogue.prototype.__proto__ = Entity.prototype;

var Paladin = function() {
    Entity.call(this, {
        type: 'Paladin',
        hp: 40,
        mp: 10
    });
}
Paladin.prototype.__proto__ = Entity.prototype;


export {Wizard, Rogue, Paladin};
