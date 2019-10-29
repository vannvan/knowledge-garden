###几种日期格式

标准日期：2017-09-19 或 2017-09-19 20:00:00
中国标准时间：Mon Oct 23 2017 17:20:13 GMT+0800 (中国标准时间)
时间戳：1508750413
毫秒数：1508750413000 

### 日期或中国标准时间转毫秒数：

```js
//变量
let myDate2 = 'Mon Oct 23 2017 17:20:13 GMT+0800 (中国标准时间)';
let myDate3 = '2017-09-19';
let myDate4 = '2017-09-19 20:00:00';

//实现方法
function dateToMs (date) {
    let result = new Date(date).getTime();
    return result;
}

//例子
console.log(dateToMs(myDate2));//--->1508750413000
console.log(dateToMs(myDate3));//--->1505779200000
console.log(dateToMs(myDate4));//--->1505779400000
```

### 毫秒数或中国标准时间转日期：

```js
//变量
let myTime1 = dateToLongMs(myDate2);
let myTime2 = dateToLongMs(myDate3);
let myTime3 = dateToLongMs(myDate4);

//实现方法 @return 返回2个值，一个是带时分秒，另一个不带。
function msToDate (msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();
let result1 = year + 
             '-' + 
             ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
             '-' + 
             ((date + 1) < 10 ? '0' + date : date) + 
             ' ' + 
             ((hour + 1) < 10 ? '0' + hour : hour) +
             ':' + 
             ((minute + 1) < 10 ? '0' + minute : minute) + 
             ':' + 
             ((second + 1) < 10 ? '0' + second : second);
let result2 = year + 
             '-' + 
             ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
             '-' + 
             ((date + 1) < 10 ? '0' + date : date);
let result = {
    hasTime: result1,
    withoutTime: result2
};
return result;
}

//例子
console.log(msToDate(myTime1).hasTime);//--->2017-10-23 17:20:13
console.log(msToDate(myTime1).withoutTime);//--->2017-10-23
console.log(msToDate(myTime2).hasTime);//--->2017-09-19 08:00:00
console.log(msToDate(myTime2).withoutTime);//--->2017-09-19

```

###标准日期转中国标准时间

```js
//变量
let myDate4 = '2017-09-19';
let myDate5 = '2017-09-19 20:00:00';

//实现方法
function formatterDate (date) {
    let result = new Date(date);
    return result;
}

//例子
console.log(formatterDate(myDate4));//--->Tue Sep 19 2017 08:00:00 GMT+0800 (中国标准时间)
console.log(formatterDate(myDate5));//--->Tue Sep 19 2017 20:00:00 GMT+0800 (中国标准时间)
```

### 格林尼治时间 转 北京时间

```js
function myTimeToLocal(inputTime){
    if(!inputTime && typeof inputTime !== 'number'){
        return '';
    }
    let localTime = '';
    inputTime = new Date(inputTime).getTime();
    const offset = (new Date()).getTimezoneOffset();
    localTime = (new Date(inputTime - offset * 60000)).toISOString();
    localTime = localTime.substr(0, localTime.lastIndexOf('.'));
    localTime = localTime.replace('T', ' ');
    return localTime;
}

console.log(myTimeToLocal(1530540726443)); // 2018-07-02 22:12:06
console.log(myTimeToLocal('2017-11-16T05:23:20.000Z')); // 2017-11-16 13:23:20
```


### 补充示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Date对象</title>
    <style>
        body {background-color: #333; color: white;}
    </style>
</head>
<body>
    <script type="text/javascript">
        /**** 3. 时间转换  */
        var testDate = new Date();
        var dateobj_toString = testDate.toString();           // toString() 把 Date 对象转换为字符串。
        var dataobj_toTimeString = testDate.toTimeString();   // toTimeString()  把 Date 对象的时间部分转换为字符串。
        var dateobj_toDateString = testDate.toDateString();   // toDateString()  把 Date 对象的日期部分转换为字符串。

        var dateobj_toUTCString = testDate.toUTCString();     // toUTCString()   根据世界时，把 Date 对象转换为字符串。

        var dateobj_toLocalString = testDate.toLocaleString(); // toLocaleString()  根据本地时间格式，把 Date 对象转换为字符串。
        var dateobj_toLocalTimeString = testDate.toLocaleTimeString();   // toLocaleTimeString()   根据本地时间格式，把 Date 对象的时间部分转换为字符串。
        var dateobj_toLocaleDateString = testDate.toLocaleDateString();   // toLocaleDateString()   根据本地时间格式，把 Date 对象的日期部分转换为字符串。
        document.write("dateobj_toString===="+dateobj_toString+ '<br><br>');  
        document.write("dataobj_toTimeString===="+dataobj_toTimeString+ '<br><br>');  
        document.write("dateobj_toDateString===="+dateobj_toDateString+ '<br><br>');  

        document.write("dateobj_toUTCString===="+dateobj_toUTCString+ '<br><br>');  
        
        document.write("dateobj_toLocalString===="+dateobj_toLocalString+ '<br><br>');  
        document.write("dateobj_toLocalTimeString===="+dateobj_toLocalTimeString+ '<br><br>');  
        document.write("dateobj_toLocaleDateString===="+dateobj_toLocaleDateString+ '<br><br>');  

    </script>
</body>
</html>
```

输出结果：

![](https://images2015.cnblogs.com/blog/734402/201704/734402-20170405122731597-991794882.png)

### Date常用Api

```js
new Date() // 创建一个时间对象 Fri Jul 12 2019 19:59:59 GMT+0800 (中国标准时间)

// 返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。
Date.now(); // 1562932828164

// 解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数
Date.parse('2019.7.12') // 1562860800000

// 年月日时分秒 获取
let dateMe = new Date()

dateMe.getFullYear() // 2019 | 根据本地时间返回指定日期的年份
dateMe.getMonth() // 6 | 根据本地时间，返回一个指定的日期对象的月份，为基于0的值（0表示一年中的第一月）。
dateMe.getDate() // 12 | 根据本地时间，返回一个指定的日期对象为一个月中的哪一日（从1--31）
dateMe.getHours() // 20 |根据本地时间，返回一个指定的日期对象的小时。
dateMe.getMinutes() // 11 | 根据本地时间，返回一个指定的日期对象的分钟数。
dateMe.getSeconds() // 29 | 方法根据本地时间，返回一个指定的日期对象的秒数
dateMe.getMilliseconds() // 363 | 根据本地时间，返回一个指定的日期对象的毫秒数。

dateMe.toJSON() // 🔥 "2019-07-12T12:05:15.363Z" | 返回 Date 对象的字符串形式
dateMe.getDay() // 5 | 根据本地时间，返回一个具体日期中一周的第几天，0 表示星期天（0 - 6）
dateMe.getTime() // 1562933115363 | 方法返回一个时间的格林威治时间数值。
dateMe.toString() // "Fri Jul 12 2019 20:05:15 GMT+0800 (中国标准时间)" | 返回一个字符串，表示该Date对象
dateMe.getTimezoneOffset() // -480（说明比正常时区慢480分钟，所以要加480分钟才对） | 返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。
dateMe.toDateString() // "Fri Jul 12 2019" | 以美式英语和人类易读的形式返回一个日期对象日期部分的字符串。
```

### Date常用to...方法

```js
var timestamp = new Date()
timestamp.toISOString()   //  "2019-10-17T02:22:44.009Z"   
timestamp.toISOString().split("T")   // ["2019-10-17", "02:24:04.562Z"]   

timestamp.toLocaleDateString()  // "2019/10/17"
timestamp.toLocaleDateString().replace(/\//g,'-')   // 2019-10-17

timestamp.toTimeString()    //"10:29:28 GMT+0800 (中国标准时间)"
timestamp.toTimeString().substr(0,8).replace(/:/g,'-')  // "10-29-28" 

timestamp.toLocaleTimeString()   // "上午10:33:02"
timestamp.toLocaleTimeString().substr(2).replace(/:/g,'-')   // "10-22-02"

timestamp.toJSON().replace("T",' ').substring(0,19)   //"2019-10-29 07:47:24"
```

