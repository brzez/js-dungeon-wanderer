import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'


var CreateACharacter = function(game) {
    Stage.apply(this, [game]);
};

CreateACharacter.prototype.__proto__ = Stage.prototype;

CreateACharacter.prototype.getLayers = function() {
    if(!this.getState().character){
        this.getState().character = {};
    }
    var character = this.getState().character;
    let data = { character };

    return new Layers({
        view_layer: new View('create_a_character/view', data),
        ui_layer: new View('create_a_character/ui', data)
    })
};

CreateACharacter.prototype.processInput = function(input) {
    if(input.name){
        this.getState().character.name = input.name;
    }
};

export default CreateACharacter;
