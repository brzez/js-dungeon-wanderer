import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import {Wizard, Rogue, Paladin} from '../../entity/entities'


var CreateACharacter = function(game) {
    Stage.apply(this, [game]);
    // @todo: move to init()
    if(!this.getState().character){
        this.getState().character = {};
    }
};

CreateACharacter.prototype.__proto__ = Stage.prototype;

CreateACharacter.prototype.getClassTemplates = function() {
    var templates = [];

    [
        Wizard, Rogue, Paladin
    ].forEach((cls) => {
        var instance = new cls();
        templates.push(instance.getData());
    })

    return templates;
}

CreateACharacter.prototype.getLayers = function() {
    var character = this.getState().character;

    let data = { character, class_templates: this.getClassTemplates() };

    return new Layers({
        view_layer: new View('create_a_character/view', data),
        ui_layer: new View('create_a_character/ui', data)
    })
};

CreateACharacter.prototype.processInput = function(input) {
    let character = this.getState().character;

    if(input.name){
        character.name = input.name;
    }
    
    if(input.type){
        this.getClassTemplates().forEach((characterClass)=>{
            if(characterClass.type !== input.type){ 
                return;
            }
            character.entity = characterClass;
        })   
    }
    console.log(character)
    if(character.name && character.entity){
        console.log('character created -> setStage to something else')
        this.setStage('room');
    }
};

export default CreateACharacter;
