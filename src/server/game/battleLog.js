var Log = function() {
    var log = [];
    this.add = function(data) {
        if(Array.isArray(data)){
            data.forEach((line)=>{
                this.add(line);
            })
        }
        log.push({text: data});
        return this;
    }
    this.serialize = function() {
        return log;
    }
}


var battleLog = new Log();


export default battleLog;
