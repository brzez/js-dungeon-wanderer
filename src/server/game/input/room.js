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
