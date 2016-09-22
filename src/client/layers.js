import view from './view'


/**
 * renders multiple layers
 */
export default function(layers, cb) {
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
