import express from 'express'
import compression from 'compression'

import viewEngine from './server/view-engine'

var app = express();

app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.render('index', {test: 'xoxo'})
});

app.use(compression())

viewEngine(app);

app.use(express.static(__dirname + '/public'))

app.listen(3000);
