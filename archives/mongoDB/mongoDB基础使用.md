## 命令行方法

- show dbs 显示所有数据的列表
- db 显示当前数据库对象或集合
- use shop  表示链接到shop数据库
- mongodb://admin:123456@localhost/  使用用户 admin 使用密码 123456 连接到本地的 MongoDB 服务上
- mongodb://admin:123456@localhost/test 使用用户名和密码连接登陆到指定数据库
- mongodb://localhost  连接本地数据库服务器
- db.user.insert({name:'bob',age:21})   表示向user集合添加一条记录
- db.dropDatabase()   删除数据库，需在当前数据库上删除
- db.shop.drop()   删除shop集合
- db.createCollection(name,option)  创建集合   options: 可选参数, 指定有关内存大小及索引的选项
- show collections /show tables   查看已有集合
- db.createCollection("mycol", { capped : true, autoIndexId : true, size :  6142800, max : 10000 } )   创建固定集合 mycol，整个集合空间大小 6142800 KB, 文档最大个数为 10000 个。

PS:在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

###  update()方法

```
db.collection.update(
   <query>,   // update的查询条件，类似sql update查询内where后面的。
   <update>,  // update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
   {
     upsert: <boolean>,  // 可选，含义是如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
     multi: <boolean>,  //可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新
     writeConcern: <document>  //可选，抛出异常的级别。
   }
)
```

### save()方法   

通过传入的文档来替换已有文档。语法格式如下：

```
db.collection.save(
   <document>,   //文档数据
   {
     writeConcern: <document>  //可选，抛出异常的级别。
   }
)
```

### remove()方法

```
db.collection.remove(
   <query>,   // （可选）删除的文档的条件。
   {
     justOne: <boolean>,  //(可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
     writeConcern: <document>
   }
)

//db.col.remove({})  //删除所有数据
```

### find()方法

```
db.collection.find(query, projection)
//query ：可选，使用查询操作符指定查询条件
//projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：
db.col.find().pretty()
```

#### MongoDB和SQL查询语法比较

| 操作       | 格式                     | 范例                                        | RDBMS中的类似语句       |
| :--------- | :----------------------- | :------------------------------------------ | :---------------------- |
| 等于       | `{<key>:<value>`}        | `db.col.find({"by":"菜鸟教程"}).pretty()`   | `where by = '菜鸟教程'` |
| 小于       | `{<key>:{$lt:<value>}}`  | `db.col.find({"likes":{$lt:50}}).pretty()`  | `where likes < 50`      |
| 小于或等于 | `{<key>:{$lte:<value>}}` | `db.col.find({"likes":{$lte:50}}).pretty()` | `where likes <= 50`     |
| 大于       | `{<key>:{$gt:<value>}}`  | `db.col.find({"likes":{$gt:50}}).pretty()`  | `where likes > 50`      |
| 大于或等于 | `{<key>:{$gte:<value>}}` | `db.col.find({"likes":{$gte:50}}).pretty()` | `where likes >= 50`     |
| 不等于     | `{<key>:{$ne:<value>}}`  | `db.col.find({"likes":{$ne:50}}).pretty()`  | `where likes != 50`     |

#### AND条件

```
db.col.find({key1:value1, key2:value2}).pretty()
```

#### OR条件

```
>db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

#### [$type操作符](https://www.runoob.com/mongodb/mongodb-operators-type.html)  

如果想获取 "col" 集合中 title 为 String 的数据，你可以使用以下命令：

```
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})
```

#### limit()方法

```
>db.COLLECTION_NAME.find().limit(NUMBER)
```

#### skip()方法

使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数。

```
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

#### sort()方法

sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列。

```
>db.COLLECTION_NAME.find().sort({KEY:1})
以下语句表示col 集合中的数据按字段 likes 的降序排列：
>db.col.find({},{"title":1,_id:0}).sort({"likes":-1})
```

### mongoDB备份数据

```
mongodump -h dbhost -d dbname -o dbdirectory
-h：
MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

-d：
需要备份的数据库实例，例如：test

-o：
备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。
```

mongodump 命令可选参数列表如下所示：

| 语法                                              | 描述                           | 实例                                             |
| :------------------------------------------------ | :----------------------------- | :----------------------------------------------- |
| mongodump --host HOST_NAME --port PORT_NUMBER     | 该命令将备份所有MongoDB数据    | mongodump --host runoob.com --port 27017         |
| mongodump --dbpath DB_PATH --out BACKUP_DIRECTORY |                                | mongodump --dbpath /data/db/ --out /data/backup/ |
| mongodump --collection COLLECTION --db DB_NAME    | 该命令将备份指定数据库的集合。 | mongodump --collection mycol --db test           |

### mongoDB恢复数据

```
>mongorestore -h <hostname><:port> -d dbname <path>
--host <:port>, -h <:port>：
MongoDB所在服务器地址，默认为： localhost:27017

--db , -d ：
需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

--drop：
恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

<path>：
mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\dump\test。

你不能同时指定 <path> 和 --dir 选项，--dir也可以设置备份目录。

--dir：
指定备份的目录

你不能同时指定 <path> 和 --dir 选项。
```

### mongoDB安装配置

```
1.D:\Momgo 为mongodb安装根目录

2.在D:\Mongo下新建data文件夹

3.在D:\Mongo\下新建db作为数据库存放的地方，新建logs文件夹做为日志目录

4.在D:\Mongo\data\log下新建文件mongod.log

5.在D:\Momgo下新建文件mongo.config，打开并添加

dbpath=D:\Mongo\data\db

logpath=D:\Mongo\data\log\mongod.log

6.mongod --config D:\mongodb\mongo.config --install --serviceName "MongoDB"

7.打开电脑查看服务是否已改为自启动
```

### mac安装方法

https://learnku.com/articles/48547

需要注意的地方，编辑全变量应该是如下方式

> vim ~/.bash_profile

mongod --dbpath ~/Local/mogodb-macos-5.0.0/data/db --logpath ~/Local/mogodb-macos-5.0.0/log/mongo.log --fork

默认端口

http://127.0.0.1:27017/



adminMongo链接 mongodb://127.0.0.1:27017/



## 文章

- [Node+Vue3.0+Mongodb实现完美解决高并发的购物平台管理系统](https://blog.csdn.net/weixin_43742274/article/details/114967596)
- [Mongoose各类用法示例-实用](https://vimsky.com/examples/usage/mongoose-where-function.html)
