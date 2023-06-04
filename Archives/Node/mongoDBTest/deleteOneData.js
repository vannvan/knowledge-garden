/*
* @Author: wanwan
* @Date:   2019-11-25 23:01:25
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:01:50
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var whereStr = {"name":'bob'};  // 查询条件
    dbo.collection("user").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});