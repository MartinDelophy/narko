var utils =module.exports =function(){

    if (this instanceof utils) {

    }else{
        return new utils;
    }
    
}

utils.prototype.isFunction=function(object){
  return (Object.prototype.toString.call(object)=="[object Function]")  
}

utils.prototype.matchBracket = function(content){
    var stack =[]
    stack.push(1)
    for(var i=0;i<content.length;i++){
        if(content[i]=="{"){
            stack.push(1)
        }
        if(content[i]=="}"){
            stack.pop()
        }
        if(stack.length ==0){
            return i;
            break;
        }
    }
}
utils.prototype.matchScript = function(str){
    var scriptStart =str.match("script{");
    if(scriptStart ==null){
        return;
    }
    scriptStart =scriptStart.index;
    var content =str.slice(scriptStart+7);
    var scriptEnd=utils.prototype.matchBracket(content)+scriptStart+7;

   return str.slice(scriptStart+7,scriptEnd);
}
utils.prototype.findScript = function(str){
    if(str.match("script{") ==null){
        return str.length;
    }
   return str.match("script{").index;
}