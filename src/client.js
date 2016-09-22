import request from './client/request'
import layers from './client/layers'


// request('get', '/', function(state, xhr) {
//     layers(state, function() {
//         console.log.apply(console, arguments)
//     })
// });

let serializeForm = function(form) {
    // first - group the inputs by name
    let grouped = {};
    for(let index = 0; index < form.elements.length; index++){
        let element = form.elements[index];
        if(element.disabled || !element.name) continue;
        if(!grouped[element.name]){
            grouped[element.name] = [];
        }
        grouped[element.name].push(element);
    }
    let data = {};
    // build data object [{name=>value}]
    for(var name in grouped){
        var elements = [].slice.call(grouped[name]);
        // dataset.submitted elements have priority
        data[name] = elements.sort(function(a, b) {
            return b.dataset.submitted - a.dataset.submitted;
        }).map(function(o) {
            return o.value;
        }).shift();
    }
    return data;
}

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
        let data = serializeForm(this);
        console.log(data)
    }
})
