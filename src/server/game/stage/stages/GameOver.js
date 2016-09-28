import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'


var GameOver = function(game) {
    Stage.apply(this, [game]);
};

GameOver.prototype.init = function() {
};

GameOver.prototype.__proto__ = Stage.prototype;


GameOver.prototype.getLayers = function() {
    let data = {};

    return new Layers({
        view_layer: new View('game_over/view', data),
        ui_layer: new View('game_over/ui', data)
    })
};

GameOver.prototype.processInput = function(input) {
    // any input will restart the game.
    // this.game.state = {};
    this.game.setStage('create_a_character')
};

export default GameOver;
