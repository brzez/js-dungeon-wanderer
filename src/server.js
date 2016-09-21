var express     = require('express');
var compression = require('compression');
var session     = require('express-session');
var bodyParser     = require('body-parser');

import viewEngine from './server/view-engine'

import Game from './server/game'

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

app.set('view engine', 'html');
app.engine('html', viewEngine);

var game = new Game(app);

app.get('/', function(req, res) {
    game.renderView().then(function(game_view) {
        res.render('index', {game_view})
    })
});

app.use(express.static(__dirname + '/public'))

app.listen(3000);
