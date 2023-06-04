/*
* @Author: wanwan
* @Date:   2019-11-25 22:54:32
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 22:57:01
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var whereStr = {"name":'bob'};  // 查询条件
    var updateStr = {$set: { "age" : 23 }};
    dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });
});