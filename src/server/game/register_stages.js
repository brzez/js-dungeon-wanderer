import CreateACharacter from './stage/stages/CreateACharacter'
import Room from './stage/stages/Room'

export default function(stageFactory){
    return stageFactory
        .register('create_a_character', CreateACharacter)
        .register('room', Room)
        ;
}
