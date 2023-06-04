/*
* @Author: wanwan
* @Date:   2019-11-25 23:07:43
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:09:17
*/
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/shop';
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("shop");
    dbase.createCollection('user', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});