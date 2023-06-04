/*
* @Author: wanwan
* @Date:   2019-11-25 23:12:30
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:12:43
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("shop");
    dbo.collection("user").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});