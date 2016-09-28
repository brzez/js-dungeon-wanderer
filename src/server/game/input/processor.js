var InputProcessor = function(stage) {
    this.stage = stage;
}
InputProcessor.prototype.setLog = function(log) {
    this.log = log;
};
InputProcessor.prototype.getStage = function() {
    return this.stage;
};
InputProcessor.prototype.getState = function() {
    return this.getStage().getState();
};
InputProcessor.prototype.getControls = function() {
    return {};
};
InputProcessor.prototype.processInput = function(input) {};

InputProcessor.prototype.getPlayer = function() {
    return this.getStage().getPlayer();
};
InputProcessor.prototype.getMonster = function() {
    return this.getStage().getMonster();
};

export default InputProcessor;
