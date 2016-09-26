import View from './view'
import Layers from './layers'
import StageFactory from './stage/factory'

import register_stages from './register_stages'
import entityRegistry from './entity/registry'


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
    if(this.stageInstance){
        return this.stageInstance;
    }
    let stage = this.state.stage;
    if(!stage){
        return null;
    }
    return this.stageInstance = this.stageFactory.create(stage.name, stage.data);
};

Game.prototype.setStage = function(name, data = {}) {
    this.stageInstance = null;
    var stage = this.stageFactory.create(name, data);
    this.state.stage = {
        name: name,
        data: stage.serialize()
    }
    stage.init();
    return stage;
};

Game.prototype.init = function(state) {
    if(this.getStage() !== null){
        return;
    }
    // mock player, skip create_a_character
    state.character = entityRegistry.create('Wizard').serialize();
    console.log(state)
    return this.setStage('room');
    // 

    // initial stage
    if(this.getStage() === null){
        this.setStage('create_a_character');
    }
};

Game.prototype.onFinish = function() {
    var stage = this.getStage();
    if(stage){
        stage.onFinish();
    }
};

Game.prototype.processInput = function(input) {
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
