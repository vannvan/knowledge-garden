/*
* @Author: wanwan
* @Date:   2019-11-25 23:05:09
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:06:34
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    let name = '王富贵' + Math.ceil(Math.random()*10); 
    var myobj = { name: name, age:21 };
    dbo.collection("user").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});