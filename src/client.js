import render from 'view-engine'

import request from './client/request'

request('get', '/', function(response, xhr) {
    console.log(response);
});
