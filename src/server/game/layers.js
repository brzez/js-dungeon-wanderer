
var Layers = function(layers) {
    this.all = layers;
}

Layers.prototype.toJson = function() {
    return JSON.stringify(this.all);
};

Layers.prototype.render = function(app) {
    var promises = [];
    for(let name in this.all){
        let layer = this.all[name];
        let promise = new Promise(function(resolve, reject) {
            app.render(layer.template, layer.data, function(err, result) {
                if(err){
                    return reject(err);
                }
                resolve({name: name, rendered: result})
            });
        });
        promises.push(promise);
    }

    return Promise.all(promises).then(function(result) {
        var layers = {};
        result.forEach(function(layer) {
            layers[layer.name] = layer.rendered;
        })
        return layers;
    });
};

export default Layers;
