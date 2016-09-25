var InputProcessor = function(stage) {
    this.stage = stage;
}
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

export default InputProcessor;
