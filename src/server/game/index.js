var express = require('express');

/*
  Will load the game from the session
  Will store user game state in the session

  Will check if request is xhr - if y - will output json
  else - respond with a full html page

  Methods:
    - get: will output full html render of current game state
    - post: will pass data to the game & return json || html
  
  it wraps around the router, so it can access to req / res before doing any actions
 */

export default function(options){
    
    var gameMiddleware = function(req, res, next) {
        var router = express.Router();

        router.get('/', function(req, res) {
            res.send('get /');
        });

        router.post('/', function(req, res) {
            res.send('post / data: ' + JSON.stringify(req.body));
        });

        return router(req, res, next);
    }

    return gameMiddleware;
};
