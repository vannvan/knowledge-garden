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

###毫秒数或中国标准时间转日期：

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

