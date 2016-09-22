var path = require('path');

export default function(app, name) {
    var root = app.get('views');
    var viewEngine = app.get('view engine');

    var viewPath = path.resolve(path.join(root, [name, viewEngine].join('.')));
    var viewsDir = path.resolve(root);
    
    if(!viewPath.startsWith(viewsDir)){
        throw new Error("invalid view");
    }

    return viewPath;
}
