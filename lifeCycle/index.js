var utils =require("../utils")();
var lifeCycle={}

lifeCycle.beforeCreate = function(_func){
    if(utils.isFunction(_func)){
        _func()
    }   
}

lifeCycle.onCreate = function(_func){
    lifeCycle.beforeCreate.call(lifeCycle.onCreate ,_func)
}

lifeCycle.afterCreate = function(_func){
    lifeCycle.beforeCreate.call(lifeCycle.onCreate ,_func)
}

module.exports=lifeCycle;