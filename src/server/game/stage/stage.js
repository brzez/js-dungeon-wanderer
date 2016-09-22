/*
    Game#getLayers and Game#processInput will get delegated here
    Will be responsible for handling current state of the game
 */


var Stage = function() {
    
}

Stage.prototype.getLayers = function() {
    throw new Error('method not implemented');    
};

Stage.prototype.processInput = function(input) {
    throw new Error('method not implemented');    
};

export default Stage;
