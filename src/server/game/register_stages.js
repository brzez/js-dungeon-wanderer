import CreateACharacter from './stage/stages/CreateACharacter'

export default function(stageFactory){
    return stageFactory
        .register('create_a_character', CreateACharacter);
}
