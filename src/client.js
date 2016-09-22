import request from './client/request'
import view from './client/view'


request('get', '/', function(v, xhr) {
    view(v, function() {
        console.log.apply(console, arguments)
    })
});
