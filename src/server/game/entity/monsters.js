import Entity from './entity'


var monsters = {
    'Rat': (data) => {
        return new Entity(Object.assign({
            type: 'Rat',
            hp: 2,
            mp: 0,
            skills: [{type: 'Attack'}]
        }, data))
    }
}

var names = [];

for(let name in monsters){
    names.push(name);
}

export {monsters, names};
