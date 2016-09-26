import Factory from './factory'

import {Wizard, Rogue, Paladin} from './entities'
import Entity from './entity'


var entityRegistry = new Factory();

entityRegistry.register('Wizard', (data) => new Wizard(data));
entityRegistry.register('Rogue', (data) => new Rogue(data));
entityRegistry.register('Paladin', (data) => new Paladin(data));


entityRegistry.register('Rat', (data) => {
    return new Entity(Object.assign({
        type: 'Rat',
        hp: 50,
        mp: 0,
        skills: [{type: 'Attack'}]
    }, data));
})


export default entityRegistry;
