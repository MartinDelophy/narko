var fs = require('fs');
var http = require('http');

class narko {
    constructor(){
        this.file_content ="";
    }
    open(filename){
        try{
            this.file_content = fs.readFileSync(filename).toString();
        }catch(e){
            console.error("illgeal file type")
        }
    }
    fillValue(val){
        var values =Object.keys(val);
        for(var one of values){
            this.file_content=this.file_content.replace("${"+one+"}",val[one]);
        }
    }
    save (){

    }
    startServer(port){
       var that =this
        http.createServer(function(req, res){
            res.writeHead(200, {'Content-type' : 'text/html'});
            var content ='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>'+that.file_content+'</body></html>';
            res.write(content);
           }).listen(port);
    }
}

module.exports=narko;