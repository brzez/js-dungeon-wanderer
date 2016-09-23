/*
    Game#getLayers and Game#processInput will get delegated here
    Will be responsible for handling current state of the game
 */


var Stage = function(game) {
    this.game = game;
}

Stage.prototype.getState = function() {
    return this.game.state;
};

Stage.prototype.setStage = function(stage, data) {
    return this.game.setStage(stage, data);
};

Stage.prototype.init = function() {
    
};

Stage.prototype.getData = function() {
    return this.getState().stage.data;
};

Stage.prototype.getLayers = function() {
    throw new Error('method not implemented');    
};

Stage.prototype.processInput = function(input) {
    throw new Error('method not implemented');    
};

Stage.prototype.serialize = function() {
    return {};
};

export default Stage;
