## log封装

```javascript
//log.js
let logUtils = {
  log: function(content, color) {
    // console.log(color) // 可以注掉 //  查看测试参数
    if (color !== undefined) {
      console.log(
        `${'\033'}[${bg[color.bg] || 40};${font[color.font] || 37}m ${content}`
      ) // 别注掉
      // console.log('没重置前') // 可以注掉 //受上一次定义的背景色影响，会带背景色
      console.log('\033[40;37m') // 别注掉 // 预计会打一行黑色背景色空行(测试后发现打一行上一次定义的背景色的空行)，然后将颜色重置为 黑底白字，
      // console.log('哈哈哈') // 可以注掉
    } else {
      console.log(content) // 别注掉
    }
  }
}

let colors = {
  font: {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    purple: 35,
    darkgreen: 36,
    white: 37
  },
  bg: {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    purple: 45,
    darkgreen: 46,
    white: 47
  }
}

font = colors.font
bg = colors.bg
module.exports = logUtils
```

## 使用

```javascript
// index.js
let {log} = require('./log.js')

const greeting = "Hello,world" 
log(greeting,{font:"red",bg:"green"}) //  第二个参数对象随便写，错了或者不写，默认字体为白色，背景色为黑色
console.log(greeting)
```
