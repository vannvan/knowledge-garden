### 文件写入

```js
var fs = require("fs");
//       要写入的文件   要写入的内容       a追加|w写入（默认）|r（读取）  回调函数
fs.writeFile("11.txt","我是要写入的11.txt文件的内容",{flag:"a"},function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("写入成功");
    }
})

//同步操作
var res = fs.writeFileSync("11.txt","这里面是使用同步方法写的内容");
console.log(res);
```

### 文件读取

```js
//文件读取
fs.readFile("11.txt",function (err,data) {
    if(err){
        return console.log(err);
    }else {
        //toString() 将buffer格式转化为中文
        console.log(data.toString());
    }
})


//同步操作
var data = fs.readFileSync("11.txt");
console.log(data.toString());
```

### 文件修改

```js
//    要修改名字的文件  修改后的名字  回调函数
fs.rename("11.txt","22.txt",function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("修改成功");
    }
})

```

### 文件删除

```js
//删除文件
fs.unlink("11.txt",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("删除成功");
    }
})
```

### 文件复制(先读取，再复制)

```js
fs.readFile("22.txt",function (err,data) {
    if(err){
        return console.log(err);
    }else{
        var getData = data.toString();
        fs.writeFile("33.txt",getData,function (err) {
            if(err){
                return console.log(err);
            }else {
                console.log("复制欧克");
            }
        })
    }
})

//同步方法
var res = fs.writeFileSync("44.txt",fs.readFileSync("22.txt"));
console.log(res);
```

### 文件夹创建

```js
//文件夹创建
//1 -- 执行   2 -- 写入  4 -- 读取  7=1+2+4  以为创建的文件夹可执行可读可写
fs.mkdir("img",0777,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("创建成功");
    }
})
```

### 修改文件夹权限

```js
fs.chmod("img",0333,function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("修改ok");
    }
})
```

### 修改文件夹名字(与修改文件相同)

```js
//修改文件夹名称
fs.rename("img","image",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("修好");
    }
})
```

### 判断某个文件件是否存在，如果不存在创建，exists函数，是唯一一个回调函数中不带err的回调函数

```js
fs.exists("img",function (exists) {
    if(exists){
        console.log("该文件夹已经存在");
    }else {
        fs.mkdir("img",function (err) {
            if(err){
                return console.log(err);
            }else {
                console.log("创建成功");
            }
        })
    }
})
```

### 删除文件夹（只能删除空的）

```js
fs.rmdir("img",function (err) {
    if(err){
        return console.log(err);
    }else {
        console.log("删除成功");
    }
})
```

### 读取文件夹里的信息

```js
fs.readdir("image",function (err,data) {
    if(err){
        console.log(err);
    }else {
        console.log(data);
    }
})
```

### 判断一个文件是文件还是文件夹

```js
fs.stat("image",function (err,data) {
   if(err){
       return console.log(err);
   }else {
       //判断是否是文件
       if(data.isFile()){
           //是文件
           console.log("yes");
       }else{
           //是文件夹
           console.log("no");
       }
   }
})
```

### 删除空文件夹

首先获取到该文件夹里面所有的信息，遍历里面的信息，判断是文件还是文件夹，如果是文件直接删除，如果是文件，进入文件，重复上述过程

```js
function delFile(url) {
    var data = fs.readdirSync(url);
    for(var i = 0;i < data.length;i++){
        // console.log(data[i])
        var path = url + "/" +data[i];
        console.log(path);
        var stat = fs.statSync(path);
        if(stat.isFile()){
            fs.unlinkSync(path);
        }else{
            delFile(path);
        }
    }
    fs.rmdirSync(url);
}
delFile("image");
```

### 综合运用1---------------递归遍历文件夹

```js
var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('E:');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
```

### 综合运用2---------------拷贝文件夹

```js
var fs=require('fs');
var stat=fs.stat;

var copy=function(src,dst){
    //读取目录
    fs.readdir(src,function(err,paths){
        console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

var exists=function(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//不存在
            callback(src,dst);
        }else{//存在
            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

exists('./from','./to',copy)
```

