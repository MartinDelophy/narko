var narko =require('narko');

console.log(narko)
var obj = new narko

obj.open('./index.narko');
obj.fillValue({name:123});
obj.startServer(8000)



