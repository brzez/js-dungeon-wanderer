
export function pickRandom(array) {
    return array[Math.random() * array.length | 0];
}

export function pickRandomKey(o) {
    if(Array.isArray(o)){
        return o[Math.random() * o.length | 0];
    }
    // random pick from object
    var keys = [];
    for(let k in o){
        if(!o.hasOwnProperty(k)){
            continue;
        }
        keys.push(k);
    }

    return pickRandom(keys);
}

export function chance(percent) {
    // parsefloat to allow for string 'x%' arg 
    return Math.random() < (parseFloat(percent)/100);
}

export function arrayShuffle(array) {
    var tmp;
    for(let i = array.length; i-->0;){
        var p = Math.random() * array.length | 0;
        // replace el 'i' with el 'p'
        tmp = array[i];
        array[i] = array[p];
        array[p] = tmp;
    }
    return array;
}
