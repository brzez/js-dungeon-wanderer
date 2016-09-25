import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import class_templates from '../../class_templates'

import {DoorInputProcessor} from '../../input/room.js'


var Room = function(game) {
    Stage.apply(this, [game]);
};
Room.prototype.__proto__ = Stage.prototype;
/*
    view:
    You are in a *room description* room.
    You see *3* doors:
    - a *wooden door*
    - a *steel door*
    - a *wooden door*
    (optional)
    A *monster name* is blocking your way
    (optional)
    You have found a *item name*!
 */
/*
    UI:
    - Open the *wooden door*
    - Open the *steel door*
    - Open the *wooden door*
    (if monster is present)
    - Attack the *monster*
    - Use *skill* [option for reach skill]
    - Use *item* [option for reach item]
    - Try to escape [% chance]
    (if item is present)
    - pick it up
 */

Room.prototype.init = function() {
    this.getState().stage.data = {
        type: 'ugly room',
        doors: [
            // empty ob: no door
            {},
            {type: 'wooden'},
            {type: 'golden'},
        ],
        item: {type: 'banana'},
        monster: {type: 'potato' /* ... more data */}
    };
};

/*
    resolve current controls based on the room state.
    so if: 
        - data.monster - controls for fighting a monster
        - data.item    - controls for item pickup
        - data.doors/default - controls for opening doors
 */
Room.prototype.resolveInputProcessor = function() {
    return new DoorInputProcessor(this);
};

Room.prototype.getLayers = function() {
    let character  = this.getState().character;
    let stage_data = this.getData();
    let controls   = this.resolveInputProcessor().getControls();

    let data = { character, stage_data, controls };

    return new Layers({
        view_layer: new View('room/view', data),
        ui_layer: new View('room/ui', data)
    })
};

Room.prototype.processInput = function(input) {
    return this.resolveInputProcessor().processInput(input);
};

export default Room;
