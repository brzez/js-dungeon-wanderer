
export function getFormData(form) {
    // first - group the inputs by name
    let data = {};
    for(let index = 0; index < form.elements.length; index++){
        let element = form.elements[index];
        if(element.disabled || !element.name) continue;
        
        data[element.name] = element.value;
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
