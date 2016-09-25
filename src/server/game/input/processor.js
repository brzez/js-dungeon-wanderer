var InputProcessor = function(stage) {
    this.stage = stage;
}
InputProcessor.prototype.getStage = function() {
    return this.stage;
};
InputProcessor.prototype.getControls = function() {
    return {};
};
InputProcessor.prototype.processInput = function(input) {};

export default InputProcessor;
