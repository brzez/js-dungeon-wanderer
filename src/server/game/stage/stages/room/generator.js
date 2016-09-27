import itemRegistry from '../../../entity/item/registry'
import entityRegistry from '../../../entity/registry'

import {chance, pickRandom, pickRandomKey, arrayShuffle} from '../../../randomUtil.js'
import {names as monsterNames} from '../../../entity/monsters'

var roomTypes = [
    {type: 'festive'},
    {type: 'ugly'},
    {type: 'dark'}
]

var doorTypes = [
    {type: 'wooden'},
    {type: 'golden'},
    {type: 'black'}
]


var RoomGenerator = function() {
    this.config = {
        door_chance: '25%',
        item_chance: '16%',
        monster_chance: '40%'
    }
}

RoomGenerator.prototype.generate = function() {
    let room = {
        type: pickRandom(roomTypes)
    };

    // always at least one door
    let doors = [pickRandom(doorTypes)];

    for(let i = 0; i < 2; i++){
        // 20% chance for another door
        doors.push(chance(this.config.door_chance) ? pickRandom(doorTypes) : {});
    }

    room.doors = arrayShuffle(doors);

    if(this.config.item_chance){
        let item = itemRegistry.create(pickRandomKey(itemRegistry.getAll())).serialize();
        room.item = item;
    }

    if(this.config.monster_chance){
        let monsterName = pickRandom(monsterNames);
        let monster = entityRegistry.create(monsterName).serialize();
        room.monster = monster;
    }
    return room;

    // structure:
    // return {
    //     type: 'ugly room',
    //     doors: [
    //         // empty ob: no door
    //         {},
    //         {type: 'wooden'},
    //         {type: 'golden'},
    //     ],
    //     item: {type: 'Health Potion'},
    //     monster: {type: 'Rat'}
    // };
};


var instance = new RoomGenerator();


export {RoomGenerator, instance};
