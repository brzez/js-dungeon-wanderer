import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import class_templates from '../../class_templates'


var Room = function(game) {
    Stage.apply(this, [game]);
};

Room.prototype.init = function() {
    this.getState().stage.data = {
        // walls: (array)
        // each wall describes itself
        // wall can have a door. doors also need to have a type
        walls: [
            {type: 'wall type'},
            {   
                type: 'wall type',
                door: {
                    type: 'door type'
                }
            },
            {type: 'wall type'}
        ],
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
