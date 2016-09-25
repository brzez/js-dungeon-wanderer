import Factory from '../factory.js'

var itemRegistry = new Factory();

var HealthPotion = function() {
    this.type = this.name = 'Health Potion'
};
HealthPotion.prototype.use = function(self) {
    self.heal(10);
};
HealthPotion.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

itemRegistry.register('Health Potion', () => new HealthPotion)


export default itemRegistry;
