
export function getFormData(form) {
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

export function serializeForm(form) {
    let data = getFormData(form);
    var output = [];
    for(let key in data){
        output.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
    }
    return output.join('&').replace(/%20/g, '+');
}
