import view from './view'


/**
 * renders multiple layers
 */
export default function(layers, cb) {
    var pending = 0;
    var rendered = {};
    for(var k in layers){
        pending++;
        view(layers[k], (function(name) {
            return function(result) {
                pending--;
                rendered[name] = result;
                if(!pending){
                    cb(rendered);
                }
            }
        })(k))
    }
}
