var Log = function() {
    var log = [];
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
}


var battleLog = new Log();


export default battleLog;
