import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import entityRegistry from '../../entity/registry'


var CreateACharacter = function(game) {
    Stage.apply(this, [game]);
};

CreateACharacter.prototype.init = function() {
    if(!this.getState().character){
        this.getState().character = {};
    }
};

CreateACharacter.prototype.__proto__ = Stage.prototype;

CreateACharacter.prototype.getClassTemplates = function() {
    var templates = [];

    ['Wizard', 'Rogue', 'Paladin']
    .forEach((cls) => {
        var instance = entityRegistry.create(cls);
        templates.push(instance.serialize());
    });

    return templates;
}

CreateACharacter.prototype.getLayers = function() {
    let data = {data: this.getData(), class_templates: this.getClassTemplates()};

    return new Layers({
        view_layer: new View('create_a_character/view', data),
        ui_layer: new View('create_a_character/ui', data)
    })
};

CreateACharacter.prototype.processInput = function(input) {
    let state = this.getState();
    let data  = this.getData();

    if(input.name){
        data.name = input.name;
    }
    if(input.type){
        data.type = input.type;
    }

    if(data.name && data.type){
        // name + class set.
        // create a character and we are done here.
        var character = entityRegistry.create(data.type);
        state.character = character.serialize()
        state.character.name = data.name;
        console.log('character created -> setStage to something else')
        this.setStage('room');
    }
};

export default CreateACharacter;
