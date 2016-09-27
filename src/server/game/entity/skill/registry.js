import Factory from '../factory.js'
import {chance} from '../../randomUtil'

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
    this.mp_needed = 5;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
Heal.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
Heal.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`${this.name} failed - not enough mana`);
    }
    self.removeMana(this.mp_needed)
    self.addHealth(7);
};
Heal.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Heal', () => new Heal)

var Thunderbolt = function() {
    this.type = this.name = 'Thunderbolt';
    this.mp_needed = 10;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
Thunderbolt.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
Thunderbolt.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`${this.name} failed - not enough mana`);
    }
    self.removeMana(this.mp_needed)
    enemy.removeHealth(7);
};
Thunderbolt.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Thunderbolt', () => new Thunderbolt)

var BanishUndead = function() {
    this.type = this.name = 'Banish Undead';
    this.mp_needed = 6;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
BanishUndead.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
BanishUndead.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`${this.name} failed - not enough mana`);
    }
    self.removeMana(this.mp_needed);
    if(enemy.isUndead()){
        enemy.removeHealth(7);
    }
};
BanishUndead.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Banish Undead', () => new BanishUndead);


var Backstab = function() {
    this.type = this.name = 'Backstab';
    this.mp_needed = 8;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
Backstab.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
Backstab.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`${this.name} failed - not enough mana`);
    }
    self.removeMana(this.mp_needed);
    enemy.removeHealth(chance('50%') ? 15 : 0);
};
Backstab.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Backstab', () => new Backstab)

var Slash = function() {
    this.type = this.name = 'Slash';
    this.mp_needed = 6;

    this.name = `${this.name} (mana: ${this.mp_needed})`;
};
Slash.prototype.canUse = function(self) {
    return self.isManaAvailable(this.mp_needed);
};
Slash.prototype.use = function(self, enemy) {
    if(!this.canUse(self)){
        throw new Error(`${this.name} failed - not enough mana`);
    }
    self.removeMana(this.mp_needed);
    for(let i = 0;i < 4; i++){
        if(chance('30%')){
            continue;
        }
        enemy.removeHealth(3);
    }
};
Slash.prototype.serialize = function() {
    return {type: this.type, name: this.name};
};

skillRegistry.register('Slash', () => new Slash)


export default skillRegistry;
