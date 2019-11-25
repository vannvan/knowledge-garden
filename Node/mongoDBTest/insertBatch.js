/*
* @Author: wanwan
* @Date:   2019-11-25 23:02:58
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:11:57
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    let age = Math.ceil(Math.random()*20);
    var myobj =  [
        { name: '张三', age: age, sex: '男'},
        { name: '李四', age: age, sex: '女'},
        { name: '王五', age: age, sex: '男'}
       ];
    dbo.collection("user").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});