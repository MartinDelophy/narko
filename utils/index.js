var utils =module.exports =function(){

    if (this instanceof utils) {

    }else{
        return new utils;
    }
    
}

utils.prototype.isFunction=function(object){
  return (Object.prototype.toString.call(object)=="[object Function]")  
}