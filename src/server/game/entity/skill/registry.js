import Factory from '../factory.js'

var skillRegistry = new Factory();

var Attack = function() {
    this.type = this.name = 'Attack'
};
Attack.prototype.use = function(self, enemy) {
    console.log('attack the enemy')
};
Attack.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Attack', () => new Attack)


export default skillRegistry;
