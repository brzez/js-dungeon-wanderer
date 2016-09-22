import request from './client/request'
import layers from './client/layers'


request('get', '/', function(state, xhr) {
    layers(state, function() {
        console.log.apply(console, arguments)
    })
});
