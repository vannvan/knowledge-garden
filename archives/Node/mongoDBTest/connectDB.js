/*
* @Author: wanwan
* @Date:   2019-11-25 23:08:29
* @Last Modified by:   wanwan
* @Last Modified time: 2019-11-25 23:08:58
*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/shop";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});