/*
* @Author: wanwan
* @Date:   2019-11-25 22:52:07
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 22:52:26
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });
});