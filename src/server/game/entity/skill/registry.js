import Factory from '../factory.js'

var skillRegistry = new Factory();

var Attack = function() {
    this.type = this.name = 'Attack'
};
Attack.prototype.use = function(self, enemy) {
    enemy.removeHealth(2);
};
Attack.prototype.canUse = function() {
    return true;
};
Attack.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Attack', () => new Attack)

var Heal = function() {
    this.type = this.name = 'Heal';
    this.mp_needed = 10;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
Heal.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
Heal.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`Heal failed - not enough mana`);
    }
    self.removeMana(this.mp_needed)
    self.addHealth(7);
};
Heal.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Heal', () => new Heal)


export default skillRegistry;
