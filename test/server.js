var narko =require('../index');

var obj = new narko(__dirname);

obj
.open('./index.narko')
.fillValue({name:"1231"},function(data){
        data.name =2
    return data;
})
.startServer(8000);

