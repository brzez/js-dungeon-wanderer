var path = require('path');

export default function(app, name) {
    var root = app.get('views');
    var viewEngine = app.get('view engine');

    return path.join(root, [name, viewEngine].join('.'));
}
