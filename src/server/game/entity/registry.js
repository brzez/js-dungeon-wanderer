import Factory from './factory'

import {Wizard, Rogue, Paladin} from './entities'


var entityRegistry = new Factory();

entityRegistry.register('Wizard', (data) => new Wizard(data));
entityRegistry.register('Rogue', (data) => new Rogue(data));
entityRegistry.register('Paladin', (data) => new Paladin(data));



export default entityRegistry;
