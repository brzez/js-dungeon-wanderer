import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import class_templates from '../../class_templates'


var Room = function(game) {
    Stage.apply(this, [game]);
};

Room.prototype.__proto__ = Stage.prototype;

Room.prototype.getLayers = function() {
    var character = this.getState().character;
    let data = { character };

    return new Layers({
        view_layer: new View('room/view', data),
        ui_layer: new View('room/ui', data)
    })
};

Room.prototype.processInput = function(input) {
};

export default Room;
