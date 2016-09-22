import request from './client/request'
import layers from './client/layers'

import {serializeForm} from './client/form'


// hijack all forms
document.querySelectorAll('form').forEach(function(form) {
    var buttons = form.querySelectorAll('button');
    buttons.forEach(function(button) {
        button.onclick = function() {
            buttons.forEach(function(btn) {
                btn.dataset.submitted = 0;
            })
            this.dataset.submitted = 1;
            console.log('btn#onclick')
        };
    })
    form.onsubmit = function(e) {
        console.log('form#onsubmit')
        e.preventDefault();
        request('post', '/', function(gameState) {
            layers(gameState, function(rendered) {
                for(var id in rendered){
                    document.getElementById(id).innerHTML = rendered[id];
                }
            })
        }, {data: serializeForm(this)})
    }
})
