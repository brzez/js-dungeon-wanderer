var Log = function() {
    var log = [];
    this.set = function(data) {
        log.length = 0;
        this.add(data);
    }
    this.add = function(data) {
        if(Array.isArray(data)){
            data.forEach((line)=>{
                if(typeof line == "object"){
                    this.add(line.text);
                }else this.add(line)
            })
            return;
        }
        log.push({text: data});
        return this;
    }
    this.serialize = function() {
        return log;
    }
    this.limit = function(limit) {
        //whatever
        while(log.length > limit){
            log.shift()
        }
    }
}


var battleLog = new Log();


export default battleLog;
