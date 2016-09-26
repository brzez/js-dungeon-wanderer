import {chance, pickRandom, arrayShuffle} from '../../../randomUtil.js'

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


var RoomGenerator = function() {}
RoomGenerator.prototype.generate = function() {
    let room = {
        type: pickRandom(roomTypes)
    };

    // always at least one door
    let doors = [pickRandom(doorTypes)];

    for(let i = 0; i < 2; i++){
        // 20% chance for another door
        doors.push(chance('30%') ? pickRandom(doorTypes) : {});
    }

    room.doors = arrayShuffle(doors);


    return room;

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
