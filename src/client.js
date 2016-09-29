import request from './client/request'
import renderLayers from './client/layers'

import {serializeForm} from './client/form'

String.prototype.includes = function(v) {
    return ~ this.indexOf(v)
}

var toArray = function(o) {
    return [].slice.call(o)
}

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
bind();
