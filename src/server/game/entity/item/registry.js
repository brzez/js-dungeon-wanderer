import Factory from '../factory.js'

var itemRegistry = new Factory();

var HealthPotion = function() {
    this.type = this.name = 'Health Potion'
};
HealthPotion.prototype.use = function(self) {
    self.hp ++; //todo: implement entity.heal()
};
HealthPotion.prototype.serialize = function() {
    return {type: this.type};
};

itemRegistry.register('Health Potion', () => new HealthPotion;)


export default itemRegistry;
