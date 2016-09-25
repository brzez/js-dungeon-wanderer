import InputProcessor from './processor'

export var DoorInputProcessor = function(stage) {
    InputProcessor.call(this, stage);
};
DoorInputProcessor.prototype.getControls = function() {
    var stage_doors = this.getStage().getData().doors;

    var doors = [];
    stage_doors.forEach((door, idx)=>{
        if(!door.type){
            return; //empty door
        }
        doors.push({value: idx, door})   
    })

    return {doors};
};
DoorInputProcessor.prototype.processInput = function(input) {
    if(!input.door){
        return;
    }
    let {doors} = this.getControls();
    doors.forEach((door)=>{
        if(door.value == input.door){
            console.log(`opening door #${input.door}`)
        }
    })
};
DoorInputProcessor.prototype.__proto__ = InputProcessor.prototype;

export var ItemInputProcessor = function(stage) {
    InputProcessor.call(this, stage);
};
ItemInputProcessor.prototype.getControls = function() {
    var item = this.getStage().getData().item;

    return {item};
};
ItemInputProcessor.prototype.processInput = function(input) {
    if(input.action === 'pick_up'){
        let item = this.getState().stage.data.item;
        this.getPlayer().addItem(item);
        console.log(this.getPlayer());

        delete this.getState().stage.data.item;
    }
};
ItemInputProcessor.prototype.__proto__ = InputProcessor.prototype;


export var FightInputProcessor = function(stage) {
    InputProcessor.call(this, stage);
};

FightInputProcessor.prototype.getControls = function() {
    var monster = this.getStage().getData().monster;

    return {monster};
};

FightInputProcessor.prototype.processInput = function(input) {
};

FightInputProcessor.prototype.__proto__ = InputProcessor.prototype;
