/*
* @Author: wanwan
* @Date:   2019-11-25 22:53:23
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 22:53:49
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
     var whereStr = {"name":'bob'};  // 查询条件
    dbo.collection("user").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});