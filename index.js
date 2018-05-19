var fs = require('fs');
var http = require('http');
var utils =require('./utils')();

class narko {
    constructor(dir){
        this.file_content ="";
        this.filename ="";
        this.dir =dir; 
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
        this.saveConetent();
        this.file_content ='<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="UTF-8">\n'+'</head>\n'+'<body>\n'+that.file_content+'</body>\n'+'</html>';
        fs. writeFile(that.dir + '/index.html', that.file_content, {flag: 'w'}, function (err) {
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
            this.file_content = fs.readFileSync(filename).toString();
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
    //保存内容
    saveConetent(){
        this.file_content = fs.readFileSync(this.filename).toString();
        this.fillValue(this.val); 
        return this;
    }
    //启动服务
    startServer(port){
       var that =this
        http.createServer(function(req, res){
            res.writeHead(200, {'Content-type' : 'text/html'});
            this.file_content ='<!DOCTYPE html>\n'+'<html lang="en">\n'+'<head>\n'+'<meta charset="UTF-8">\n'+'</head>\n'+'<body>\n'+that.file_content+'</body>\n'+'</html>';
            res.write(this.file_content);
           }).listen(port);
           return that;
    }
}

module.exports=narko;