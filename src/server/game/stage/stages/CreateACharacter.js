import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import class_templates from '../../class_templates'


var CreateACharacter = function(game) {
    Stage.apply(this, [game]);
    // @todo: move to init()
    if(!this.getState().character){
        this.getState().character = {};
    }
};

CreateACharacter.prototype.__proto__ = Stage.prototype;

CreateACharacter.prototype.getLayers = function() {
    var character = this.getState().character;
    let data = { character, class_templates };

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
    
    if(input.class){
        class_templates.forEach((characterClass)=>{
            if(characterClass.name !== input.class){ 
                return;
            }
            character.stats = characterClass;
        })   
    }

    if(character.name && character.stats){
        console.log('character created -> setStage to something else')
        this.setStage('room');
    }
};

export default CreateACharacter;
