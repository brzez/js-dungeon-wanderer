var express = require('express');
var fs      = require('fs');

import Game from './game'
import getViewPath from '../view/getViewPath'

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
    let resolveState = (req) => {
        let state = req.session.state;
        if(!state){
            state = req.session.state = {};
        }
        return state;
    }
    
    let gameMiddleware = function(req, res, next) {
        let app    = req.app;
        let router = express.Router();

        let state = resolveState(req);

        let game = new Game(state);

        let renderResponse = function() {
            let layers = game.getLayers();
            if(req.xhr){
                return res.send(layers.toJson());
            }

            // render all layers
            layers.render(app).then(function(result) {
                res.render('index', result);
            });
        };

        let onFinish = function() {
            game.onFinish()
        }

        router.get('/', function(req, res) {
            renderResponse();
            return onFinish();
        });

        router.post('/', function(req, res) {
            game.processInput(req.body);
            renderResponse();
            return onFinish();
        });

        router.get('/template', function(req, res) {
            var name = req.query.name;
            var viewPath = getViewPath(app, name);

            fs.readFile(viewPath, function(err, result) {
                if(err){
                    return res.end();
                }
                res.send(result);
            });
        })

        return router(req, res, next);
    }

    return gameMiddleware;
};
