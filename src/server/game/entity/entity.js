import itemRegistry from './item/registry'


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

    this.data.type = data.type;
    this.data.name = data.name || data.type;
    this.data.hp   = normalizeStat(data.hp);
    this.data.mp   = normalizeStat(data.mp);

    this.data.items = data.items || [];
    this.data.skills = data.skills || [];
};

Entity.prototype.addItem = function(type) {
    this.data.items.push(type);
    return this;
};

Entity.prototype.heal = function(amount) {
    let hp = this.data.hp;
    hp.current = Math.min(hp.max, hp.current + amount);
};

Entity.prototype.useItem = function(type) {
    let items = this.data.items;
    console.log('using item', type);
    for(let i = 0;i < items.length; i++){
        console.log(items[i], type);
        if(items[i].type != type){
            continue;
        }

        let item = itemRegistry.create(type);
        item.use(this);

        items.splice(i, 1);

        return true;
    }
    return false;
};

Entity.prototype.getData = function() {
    return this.data;
};

Entity.prototype.serialize = function() {
    var {type, hp, mp, items, skills, name} = this.data;
    return {
        type, hp, mp, items, skills, name
    };
};


export default Entity;
