#narko

这是一个轻量化的模版引擎，方便新手使用和了解模版引擎的工作机制。

install: npm install  narko --sav

具体案例可见    test文件夹


About
------------
narko is a simple and light model engine,help developer use light and fast tools. v1.0.0

narko file
------------
use it as html without statement
```
<h1>${name}</h1>
```
name will be the variable to replace


document
------------
initial:

npm install narko 
var narko =require('narko');
```
var test = new narko
```
open narko file

```
test.open() #fill it with narko file
```
fill value
```
test.fillValue() #fill with Object
```
start server
```
test.startServer() #fill with server port 
```
you can add script on .narko file,just like javascript
```
script{
    console.log("hello narko")
}
```
