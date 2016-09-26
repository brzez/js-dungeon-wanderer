import CreateACharacter from './stage/stages/CreateACharacter'
import Room from './stage/stages/Room'
import GameOver from './stage/stages/GameOver'

export default function(stageFactory){
    return stageFactory
        .register('create_a_character', CreateACharacter)
        .register('room', Room)
        .register('game_over', GameOver)
        ;
}
