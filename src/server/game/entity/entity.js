import itemRegistry from './item/registry'
import skillRegistry from './skill/registry'
import toCssClassName from './toCssClassName.js'


var Entity = function(data) {
    this.data = {};
    this.init(data);
}

Entity.prototype.init = function(data) {
    var normalizeStat = (val) =>{
        val = val || 0;
        if(typeof val == "number"){
            val = {current: val, max: val};
        }
        return val;
    }
    if(!data.type){
        throw new Error(`Entity type is required`);
    }

    var normalizeType = (thing) => {
        return typeof thing === "string" ? {type: thing} : thing;
    }

    this.data.type = data.type;
    this.data.name = data.name || data.type;
    this.data.hp   = normalizeStat(data.hp);
    this.data.mp   = normalizeStat(data.mp);
    this.data.is_undead = data.is_undead || false;
    this.data.anim = data.anim || 'show';

    this.data.skills = (data.skills || [])
    .map(normalizeType)
    .map((skill) => {
        return skillRegistry.create(skill.type).serialize()
    });

    this.data.items = (data.items || [])
    .map(normalizeType)
    .map((item) => {
        return itemRegistry.create(item.type).serialize();
    });
};

Entity.prototype.isUndead = function() {
    return this.data.is_undead;
};

Entity.prototype.addItem = function(item) {
    this.data.items.push(item);
    return this;
};

Entity.prototype.isManaAvailable = function(amount) {
    return this.data.mp.current >= amount;
};

Entity.prototype.setLog = function(log) {
    this.log = log
};

Entity.prototype.addHealth = function(amount) {
    let hp = this.data.hp;
    hp.current = Math.min(hp.max, hp.current + amount);
    this.log.add(`${this.data.name} healed for ${amount}`)
};

Entity.prototype.removeHealth = function(amount) {
    let hp = this.data.hp;
    hp.current = Math.max(0, hp.current - amount);
    this.log.add(`${this.data.name} got hit for ${amount}`)
};

Entity.prototype.addMana = function(amount) {
    let mp = this.data.mp;
    mp.current = Math.min(mp.max, mp.current + amount);
    this.log.add(`${this.data.name} restored ${amount} mana`)
};

Entity.prototype.removeMana = function(amount) {
    let mp = this.data.mp;
    mp.current = Math.max(0, mp.current - amount);
    this.log.add(`${this.data.name} used ${amount} mana`)
};

Entity.prototype.isAlive = function() {
    return this.data.hp.current != 0;
};

Entity.prototype.useItemById = function(id) {
    let inv = this.getInventory();

    // doesnt actually matter if the id matches
    // we just care about the item type <=> id
    // yeah i know its stupid.

    for(let i = 0; i < inv.length; i++){
        let item = inv[i];
        if(item.id != id){
            continue;
        }

        return this.useItem(item.type);
    }

    return false;
};

Entity.prototype.useItem = function(type) {
    let items = this.data.items;
    for(let i = 0;i < items.length; i++){
        if(items[i].type != type){
            continue;
        }

        let item = itemRegistry.create(type);

        this.log.add(`${this.data.name} used item ${item.name}`)

        item.use(this);
        items.splice(i, 1);

        return true;
    }
    return false;
};

Entity.prototype.useRandomSkill = function(target) {
    var randomSkill = this.data.skills[Math.random() * this.data.skills.length | 0];
    let skill = skillRegistry.create(randomSkill.type);

    if(!skill.canUse(this)){
        // not enough mana or something. Just try another time.
        // might result in stack overflow it no usable skills
        return this.useRandomSkill(target);
    }
    this.useSkill(randomSkill.type, target);
};


Entity.prototype.getInventory = function() {
    let items = this.data.items;
    let id = 0;

    return items.map((item) => {
        item.id = ++id;
        return item;
    })
};

Entity.prototype.useSkill = function(type, target) {
    this.data.anim = 'action';
    let skills = this.data.skills;
    for(let i = 0;i < skills.length; i++){
        if(skills[i].type != type){
            continue;
        }

        let skill = skillRegistry.create(type);

        this.log.add(`${this.data.name} used skill ${skill.name}`)
        skill.use(this, target);


        return true;
    }
    return false;
};

Entity.prototype.getData = function() {
    return this.data;
};

Entity.prototype.serialize = function() {
    var {type, hp, mp, items, skills, name, anim} = this.data;
    return {
        type, hp, mp, name, items, skills, anim,
        cssClass: toCssClassName(this.data.name)
    };
};


export default Entity;
