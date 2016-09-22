/*
  Should get templates from server & cache them
 */

import request from './request'

var cache = {};

export default function(name, callback) {
    if(cache[name]){
        return callback(cache[name]);
    }
    request('get', `/template?name=${encodeURIComponent(name)}`, function(template) {
        callback(cache[name] = template);
    }, 'text')
}
