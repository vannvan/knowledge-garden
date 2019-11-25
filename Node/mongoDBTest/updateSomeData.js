/*
* @Author: wanwan
* @Date:   2019-11-25 22:58:21
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:00:34
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var whereStr = {"sex":'男'};  // 查询条件
    var updateStr = {$set: { "age" : 22 }};
    dbo.collection("user").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});