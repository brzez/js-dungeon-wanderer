

var request = function(method, url, callback, options) {
    options = options || {};

    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest');
    xhr.responseType = options.responseType || 'json';
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        callback(xhr.response, xhr);
    }
    xhr.send(options.data);
}

export default request;
