
var Factory = function() {
    this.all = {};
}

Factory.prototype.register = function(name, resolver) {
    this.all[name] = resolver;
    return this;
};

Factory.prototype.create = function(name, data = {}) {
    var resolver = this.all[name];
    if(!resolver){
        throw new Error(`Resolver for ${name} not found`);
    }
    return resolver(data);
};


export default Factory;
