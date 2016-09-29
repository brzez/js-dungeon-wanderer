import request from './client/request'
import renderLayers from './client/layers'

import {serializeForm} from './client/form'

String.prototype.includes = function(v) {
    return ~ this.indexOf(v)
}

var toArray = function(o) {
    var a = [];
    a.push.apply(a, o);
    return a;
}

// if(![].forEach){
//     // Array.prototype.forEach = function(cb){
//     //     for(let i=0;i<this.length;i++){
//     //         cb(this[i], i);
//     //     };
//     // }
// }

/**
 * Forwards form actions as xhr post
 */
var bind = function(){
    toArray(document.querySelectorAll('form')).forEach(function(form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            request('post', '/', function(gameState) {
                renderLayers(gameState, function() {
                    bind();
                });
            }, {data: serializeForm(this)})
        }
    })
}

// this seems like the easiest way to check for IE<9
if([].forEach){
    bind();
}
