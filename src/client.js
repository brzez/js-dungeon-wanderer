import request from './client/request'
import renderLayers from './client/layers'

import {serializeForm} from './client/form'

var toArray = function(o) {
    return [].slice.call(o)
}

/**
 * Forwards form actions as xhr post
 */
var bind = function(){
    toArray(document.querySelectorAll('form')).forEach(function(form) {
        form.onsubmit = function(e) {
            console.log('form#onsubmit')
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
