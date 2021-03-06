import Stage from '../stage'
import Layers from '../../layers'
import View from '../../view'

import {DoorInputProcessor, ItemInputProcessor, FightInputProcessor} from '../../input/room.js'

import entityRegistry from '../../entity/registry'
import BattleLog from '../../BattleLog'
import {instance as roomGenerator} from './room/generator'

var Room = function(game) {
    Stage.apply(this, [game]);
};
Room.prototype.__proto__ = Stage.prototype;
/*
    view:
    You are in a *room description* room.
    You see *3* doors:
    - a *wooden door*
    - a *steel door*
    - a *wooden door*
    (optional)
    A *monster name* is blocking your way
    (optional)
    You have found a *item name*!
 */
/*
    UI:
    - Open the *wooden door*
    - Open the *steel door*
    - Open the *wooden door*
    (if monster is present)
    - Attack the *monster*
    - Use *skill* [option for reach skill]
    - Use *item* [option for reach item]
    - Try to escape [% chance]
    (if item is present)
    - pick it up
 */

Room.prototype.init = function() {
    roomGenerator.generate(this.getData());
    this.getState().stage.data = roomGenerator.generate();
};

Room.prototype.log = function() {
    if(this.battleLog){
        return this.battleLog;
    }
    return this.battleLog = new BattleLog(this.getState().battleLog || []);
};

/*
    resolve current controls based on the room state.
    so if: 
        - data.monster - controls for fighting a monster
        - data.item    - controls for item pickup
        - data.doors/default - controls for opening doors
 */
Room.prototype.resolveInputProcessor = function() {
    let resolve = ()=>{
        let data = this.getData();
        if(data.monster){
            return new FightInputProcessor(this);
        }
        if(data.item){
            return new ItemInputProcessor(this);
        }
        return new DoorInputProcessor(this);
    }

    var resolved = resolve();
    resolved.setLog(this.log())
    return resolved;
};

Room.prototype.onFinish = function() {
    this.saveState()
};

Room.prototype.saveState = function() {
    this.getState().battleLog = this.log().serialize();
    this.getState().character = this.getPlayer().serialize();
    this.getData().monster = null;
    if(this.getMonster()){
        let monster = this.getMonster();
        this.getData().monster = monster.serialize();
    }
};

Room.prototype.getPlayer = function() {
    if(!this.playerInstance){
        var data = this.getState().character;
        var {type} = data;
        this.playerInstance = entityRegistry.create(type, data);
        this.playerInstance.setLog(this.log());
        return this.getPlayer();
    }   
    return this.playerInstance;
};

Room.prototype.getMonster = function() {
    if(!this.monsterInstance){
        var data = this.getData();
        if(!data.monster){
            return null;
        }
        var data = data.monster;
        var {type} = data;
        this.monsterInstance = entityRegistry.create(type, data);
        this.monsterInstance.setLog(this.log());
        return this.getMonster();
    }
    return this.monsterInstance;
};

Room.prototype.removeMonster = function() {
    this.getData().monster = this.monsterInstance = null;
};

/**
 * this will update the current fight (if monster present)
 */
Room.prototype.updateFight = function() {
    let player = this.getPlayer();
    // check if player is dead
    // if yeah then go to 'game over' stage

    // check if monster is present
    // if it's dead - remove it
    // if it's alive - use random monster skill on player

    if(!this.getMonster()){
        return;
    }
    let monster = this.getMonster();
    if(!monster.isAlive()){
        this.log().add(`${monster.data.name} died`);
        this.removeMonster();
        return;
    }

    monster.useRandomSkill(player);

    if(!player.isAlive()){
        this.log().add(`${player.data.name} died`);
        this.setStage('game_over');
    }
};

Room.prototype.getLayers = function() {
    this.log().limit(5);

    let character  = this.getPlayer().serialize();
    let stage_data = this.getData();
    let controls   = this.resolveInputProcessor().getControls();
    let monster    = this.getMonster() ? this.getMonster().serialize() : null;
    let log        = this.log().serialize();

    let inventory = this.getPlayer().getInventory();

    let data = { character, monster, stage_data, controls, log, inventory };

    let ui_name = this.getPlayer().isAlive() ? 'room/ui' : 'room/ui_dead';

    return new Layers({
        view_layer: new View('room/view', data),
        ui_layer: new View(ui_name, data)
    })
};

Room.prototype.processInput = function(input) {
    /* 
        handle item use
        this can be done on any 'layer', so it needs to be handled here
    */

    if(input.use_item){
        var itemId = input.use_item;
        this.getPlayer().useItemById(itemId);
        return this.updateFight();
    }


    return this.resolveInputProcessor().processInput(input);
};

export default Room;
