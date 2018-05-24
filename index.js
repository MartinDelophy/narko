var fs = require('fs');
var http = require('http');
var child_process = require('child_process');
var utils =require('./utils')();


class narko {
    constructor(dir){
        this.file_content ="";
        this.filename ="";
        this.dir =dir; 
        this.port ="8080";
        this.parse_content="";
        
        this.staticWatch()

    }
    //静态监视，如果文件内容产生变化则自动更新
    staticWatch(){
        var that =this
        fs.watch(that.dir, (e, filename) => {
            if(filename.match(/.narko/)!=null){
                    this.writeHTML();
            }

        })
        return that;
    }
    //写入html
    writeHTML(){
        var that =this;
        that.parse_content ='<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="UTF-8">\n'+'</head>\n'+'<body>\n'+that.file_content+'</body>\n'+'</html>';
        fs. writeFile(that.dir + '/index.html', that.parse_content, {flag: 'w'}, function (err) {
            if(err) {
             console.error(err);
             } else {
                console.log('write success');
             }
         });
    }
    //打开相关文件
    open(filename){
        this.filename =filename;
        try{
            //todo:fixed
            var content =fs.readFileSync(filename).toString();
            this.file_content = content.slice(0,utils.findScript(content));
            
            //script
            var script =utils.matchScript(content);
            this.file_content +='<script>'+script+'</script>';
        

        }catch(e){
            console.error("illgeal file type")
        }
        return this;
    }
    //填充值的内容
    fillValue(val,_callback){
        var that =this
        var values =Object.keys(val);
        that.val =val;
        for(var one of values){
            that.file_content=that.file_content.replace("${"+one+"}",that.val[one]);
        };        
        if(utils.isFunction(_callback)){
            async function getData(){
                return new Promise((resolve) => {
                    var _result =_callback(val)
                    console.log(_result)
                    resolve(_result)
                });
            }
            getData().then((v) => {
                that.val =v;
                that.writeHTML();
            });
        }
        return that;
    }
    //启动服务
    startServer(port){
       var that =this
        that.port =port;
        http.createServer(function(req, res){
            res.writeHead(200, {'Content-type' : 'text/html'});
            this.parse_content ='<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="UTF-8">\n'+'</head>\n'+'<body>\n'+that.file_content+'</body>\n'+'</html>';
            res.write(this.parse_content);
           }).listen(port);
          var url = 'http://' + "127.0.0.1:"+that.port;
           child_process.exec(`${'open'} "${url}"`);
           return that;
    }
}

module.exports=narko;