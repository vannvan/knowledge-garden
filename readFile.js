var fs = require("fs");
//path模块，可以生产相对和绝对路径
var path = require("path");

//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.resolve();
//读取文件存储数组
var fileArr = [];
const exluded = ['.git']
//读取文件目录
fs.readdir(filePath, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    var count = files.length;
    files = files.filter(item => !exluded.includes(item))
    var results = {};
    files.forEach(function (filename) {
        fs.stat(path.join(filePath, filename), function (err, stats) {
            if (err) throw err;
            if (stats.isDirectory()) {
                var name = filename;
                readFile(path.join(filePath, filename), name);
            }
        })
    });
});


//获取后缀名
function getFileType(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

//获取文件数组
function readFile(readurl, name) {
    fs.readdir(readurl, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(function (filename) {
            fs.stat(path.join(readurl, filename), function (err, stats) {
                if (err) throw err;
                //是文件
                if (stats.isFile() && getFileType(filename) == 'md') {
                    var newUrl = name + '/' + filename;
                    fileArr.push(newUrl.toString());
                    writeFile(fileArr, newUrl)
                    //是子目录
                } else if (stats.isDirectory()) {
                    var dirName = filename;
                    readFile(path.join(readurl, filename), name + '/' + dirName);
                }
            });
        });
    });
}


// 写入到filelist.js文件
function writeFile(data, newUrl) {
    data = JSON.stringify(data, null, "\t")
    let content = `const archives = ${data}`
    fs.writeFile(filePath + "/" + "filelist.js", content + '\n', function (err) {
        if (err) throw err;
        console.log(newUrl, "写入成功");
        console.log(fileArr.length)
    });
}