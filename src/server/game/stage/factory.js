/*
    Will create stages from (name:string)
 */

var Factory = function(game) {
    this.game      = game;
    this.stages = {};
}

Factory.prototype.register = function(name, stage) {
    this.stages[name] = stage;
    return this;
};

Factory.prototype.create = function(name) {
    if(!this.stages[name]){
        throw new Error(`Stage name: ${name} not registered`);
    }
    var stage = this.stages[name];
    return new stage(this.game);
};

export default Factory;
