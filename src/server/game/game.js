import View from './view'
import Layers from './layers'
import StageFactory from './stage/factory'

import register_stages from './register_stages'


/*
  # game state empty
  - create character:
    - pick a name
    - pick a class
  # game started
  - show room:
    rooms will have 1-3 doors
    room can have a monster:
     - monster needs to be defeated in a turn based combat
     - it's possible to try to run from the monster (x% chance)
    room can have an item
     - item will be picked up and added to user inventory
 */


var Game = function(state) {
    this.state = state;
    this.stageFactory = register_stages(new StageFactory(this));

    this.init(state);
};

Game.prototype.getStage = function() {
    let stage = this.state.stage;
    if(!stage){
        return null;
    }
    return this.stageFactory.create(stage.name, stage.data);
};

Game.prototype.setStage = function(name, data = {}) {
    var stage = this.stageFactory.create(name, data);
    this.state.stage = {
        name: name,
        data: stage.serialize()
    }
    stage.init();
    return stage;
};

Game.prototype.init = function(state) {
    // initial stage
    if(this.getStage() === null){
        this.setStage('create_a_character');
        this.state.character = {
            name: '',
            entity: null
        }
    }
};

Game.prototype.processInput = function(input) {
    console.log('Processing input', input);
    var stage = this.getStage();
    stage.processInput(input);
};

/**
 * Get current game state
 * @return {object} map[] name => View
 */
Game.prototype.getLayers = function() {
    return this.getStage().getLayers();
};

export default Game;
