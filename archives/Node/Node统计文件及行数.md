```js
/*
* @Author: vannvan <https://github.com/vannvan>
* @Date:   2019-10-12 15:55:28
* @Last Modified by:   vannvan
* @Last Modified time: 2019-10-12 15:56:25
*/
//引用文件系统模块
var fs = require("fs");
//引用imageinfo模块
var image = require("imageinfo");

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);

        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}

var getFiles = {
//获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            ms.mimeType && (imageList.push(item.filename))
        });
        return imageList;

    },
    //获取非图片文件列表
    getTxtList: function (path) {


        return this.getFileList(path).filter((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            return !ms.mimeType
        });

    }
};
let len = 0
let fileCount = 0
let bigFileCount = 0
// 此处指统计非图片文件，如果需要统计所有文件，可改为getFiles.getFileList方法
getFiles.getTxtList("./src/").forEach(function (item) {  //在这里输入你要统计的文件夹名（记得在后面加斜线）

    let dirState = fs.existsSync('./countLine');//判断目录是否存在
    if (!dirState) {
        fs.mkdirSync('./countLine')//创建目录
    }
    let state = fs.existsSync('./countLine/fileInfo.txt')
    let cData = "";
    if (state) {
        cData = fs.readFileSync('./countLine/fileInfo.txt')//同步读取统计文件内容
    }
    let filePath = item.path + item.filename
    let content = fs.readFileSync(filePath)
    cData = cData.toString('utf-8') + filePath + "  " + content.toString('utf8').split('\n').length + "\n";
    fs.writeFileSync('./countLine/fileInfo.txt', cData)
    let conArr = content.toString('utf8').split('\n').filter((value) => {
      return value !== ''
    });
    let fileRowNumber = content.toString('utf8').split('\n').length
    len += conArr.length
    if(fileRowNumber>300) {
        console.log(filePath)   //打印行数大于400的文件名
        bigFileCount ++
    }
  fileCount++
})

// 需要每一个文件的详细行数在文件夹countLine中的fileInfo.txt中查看
console.log('总文件数：', fileCount)
console.log('总行数(不包括空行)：', len)
console.log('超过300行代码的文件:',bigFileCount);

```

