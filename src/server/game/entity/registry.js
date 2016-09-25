import Factory from './factory'

import {Wizard, Rogue, Paladin} from './entities'
import Entity from './entity'


var entityRegistry = new Factory();

entityRegistry.register('Wizard', (data) => new Wizard(data));
entityRegistry.register('Rogue', (data) => new Rogue(data));
entityRegistry.register('Paladin', (data) => new Paladin(data));


entityRegistry.register('Rat', (data) => {
    return new Entity({
        name: data.name,
        type: 'Rat',
        hp: 5,
        mp: 0,
    });
})


export default entityRegistry;
