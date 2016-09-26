import Factory from '../factory.js'

var itemRegistry = new Factory();

var HealthPotion = function() {
    this.type = this.name = 'Health Potion'
};
HealthPotion.prototype.use = function(self) {
    self.addHealth(10);
};
HealthPotion.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

itemRegistry.register('Health Potion', () => new HealthPotion);

var ManaPotion = function() {
    this.type = this.name = 'Mana Potion'
};
ManaPotion.prototype.use = function(self) {
    self.addMana(10);
};
ManaPotion.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

itemRegistry.register('Mana Potion', () => new ManaPotion);


export default itemRegistry;
