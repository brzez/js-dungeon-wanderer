import view from './view'


/**
 * renders multiple layers
 */
function layers(layers, cb) {
    var pending = 0;
    var rendered = {};
    for(let name in layers){
        pending++;
    }
    for(let name in layers){
        view(layers[name], (function(name) {
            return function(result) {
                pending--;
                rendered[name] = result;
                if(pending == 0){
                    cb(rendered);
                }
            }
        })(name))
    }
}

export default function(gameState, cb){
    layers(gameState, function(rendered) {
        for(var id in rendered){
            document.getElementById(id).innerHTML = rendered[id];
        }
        if(cb) cb();
    })
}
