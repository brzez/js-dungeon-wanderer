

var request = function(method, url, callback, options) {
    options = options || {};

    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest');

    if(method.match(/post/i)){
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }

    var responseType = options.responseType || 'json';
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        let response = xhr.response;
        if(responseType === 'json'){
            response = JSON.parse(xhr.response);
        }
        callback(response, xhr);
    }
    xhr.send(options.data);
}

export default request;
