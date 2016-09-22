import View from './view'
import Layers from './layers'
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
};

Game.prototype.processInput = function(input) {
    console.log('Processing input', input);
    this.state.test = input.test;
};

/**
 * Get current game state
 * @return {object} map[] name => View
 */
Game.prototype.getLayers = function() {
    return new Layers({
        view_layer: new View('game_view', {test: this.state.test}),
        ui_layer:   new View('ui_view', {})
    });
};

export default Game;
