var express     = require('express');
var compression = require('compression');
var session     = require('express-session');
var bodyParser     = require('body-parser');

import viewEngine from './server/view/viewEngine'

import game from './server/game'

var app = express();

app.use(compression())
app.use(session({
    secret: 'potato tomato',
    resave: false,
    saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(express.static(__dirname + '/public', {maxAge: 60 * 60 * 24 * 1000}))

app.set('view engine', 'html');
app.engine('html', viewEngine);


app.use(game());


app.listen(3000);
