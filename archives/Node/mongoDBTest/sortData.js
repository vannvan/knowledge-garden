/*
* @Author: wanwan
* @Date:   2019-11-25 23:09:39
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:10:23
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    var mysort = { age: 1 };  //1代表升序 -1代表降序
    dbo.collection("user").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
