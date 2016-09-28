import Entity from './entity'


var monsters = {
    // 'Rat': (data) => {
    //     return new Entity(Object.assign({
    //         type: 'Rat',
    //         hp: 7,
    //         mp: 0,
    //         skills: ['Attack']
    //     }, data))
    // },
    'Undead Priest': (data) => {
        return new Entity(Object.assign({
            type: 'Undead Priest',
            hp: 11,
            mp: 15,
            is_undead: true,
            skills: ['Attack','Heal']
        }, data))
    },
    'Spooky Ghost': (data) => {
        return new Entity(Object.assign({
            type: 'Spooky Ghost',
            hp: 15,
            mp: 0,
            is_undead: true,
            skills: ['Attack']
        }, data))
    },
    'Slime': (data) => {
        return new Entity(Object.assign({
            type: 'Slime',
            hp: 10,
            mp: 0,
            skills: ['Attack', 'Thunderbolt']
        }, data))
    },
    // 'Bat': (data) => {
    //     return new Entity(Object.assign({
    //         type: 'Bat',
    //         hp: 10,
    //         mp: 0,
    //         skills: ['Attack']
    //     }, data))
    // },
}

var names = [];

for(let name in monsters){
    names.push(name);
}

export {monsters, names};
