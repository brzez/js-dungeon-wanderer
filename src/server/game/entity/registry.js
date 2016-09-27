import Factory from './factory'

import {Wizard, Rogue, Paladin} from './entities'
import Entity from './entity'
import {monsters} from './monsters'


var entityRegistry = new Factory();

entityRegistry.register('Wizard', (data) => new Wizard(data));
entityRegistry.register('Rogue', (data) => new Rogue(data));
entityRegistry.register('Paladin', (data) => new Paladin(data));

for(let name in monsters){
    entityRegistry.register(name, monsters[name]);
}

export default entityRegistry;
