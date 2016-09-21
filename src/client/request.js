

var request = function(method, url, callback, responseType) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('x-requested-with', 'xmlhttprequest');
    xhr.responseType = responseType || 'json';
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        callback(xhr.response, xhr);
    }
    xhr.send();
}

export default request;
