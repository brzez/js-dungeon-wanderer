import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import class_templates from '../../class_templates'


var Room = function(game) {
    Stage.apply(this, [game]);
};
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

    console.log(this.getState().stage)
};

Room.prototype.__proto__ = Stage.prototype;

Room.prototype.getLayers = function() {
    let character = this.getState().character;
    let stage_data = this.getData();

    let data = { character, stage_data };

    return new Layers({
        view_layer: new View('room/view', data),
        ui_layer: new View('room/ui', data)
    })
};

Room.prototype.processInput = function(input) {
};

export default Room;
