import Entity from './entity'


var monsters = {
    'Rat': (data) => {
        return new Entity(Object.assign({
            type: 'Rat',
            hp: 7,
            mp: 0,
            skills: ['Attack']
        }, data))
    },
    'Undead Priest': (data) => {
        return new Entity(Object.assign({
            type: 'Undead Priest',
            hp: 11,
            mp: 15,
            skills: ['Attack','Heal']
        }, data))
    },
}

var names = [];

for(let name in monsters){
    names.push(name);
}

export {monsters, names};
