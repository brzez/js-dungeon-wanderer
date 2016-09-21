
/*
  ## should receive input from the game
  ## should output views for the game
  they will be passed directly vja xhr / ws as {view: name, data: {...}}
  or rendered via express res.render
 */

var Game = function(app) {
    this.app = app;
};

Game.prototype.processInput = function(input) {
    console.log('Input', input);
};

Game.prototype.getCurrentState = function() {
    return {
        name: 'some_view',
        data: {
            banana: '321'
        }
    };
};

/**
 * Will render game state using app.render
 * @return {Promise} rendered view
 */
Game.prototype.renderView = function() {
    var view = this.getCurrentState();

    return new Promise((resolve, reject) => {
        this.app.render(view.name, view.data, function(err, rendered) {
            return resolve(rendered);
        })
    });
};

export default Game;
