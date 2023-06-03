/*
 * Description: 394：字符串解码
 * Url: https://leetcode.cn/problems/decode-string/
 * Tags: 栈  递归  字符串
 * Created: 2023-06-03 20:27:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-06-03 21:25:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function decodeString1(s: string): string {
  // Think for yourself for 5 minutes...
  let arr = []
  let ans = ''
  let preNum = 0

  for (let i = 0; i < s.length; i++) {
    if (!isNaN(+s[i])) {
      preNum = +s[i]
    } else if (s[i] === '[') {
      arr = []
    } else if (s[i] === ']') {
      // 需要开始计算了
      ans += Array(preNum).fill(arr.join('')).join('')
      arr = []
    } else {
      arr.push(s[i])
    }
  }

  return ans
}

/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s: string): string {
  let numStack = [] // 倍数num的等待栈
  let strStack = [] // 待拼接的str的等待栈
  let num = 0 // 倍数的“搬运工”
  let result = '' // 字符串的“搬运工”
  let tmp = ''
  for (const char of s) {
    // 向右逐字符扫描
    if (!isNaN(+char)) {
      // 遇到数字
      num = num * 10 + +char // js中+可以将数字字符转为数字
    } else if (char === '[') {
      // 入栈的时机
      strStack.push(tmp) // result进入strStack栈等待
      tmp = '' // 完成进栈后 清零
      numStack.push(num) // 倍数num进入栈等待
      num = 0 // 完成进栈后 清零
    } else if (char === ']') {
      // 出栈的时机，两个栈的栈顶出栈
      let repeatTimes = numStack.pop() // 获取拷贝次数
      tmp = strStack.pop() + tmp.repeat(repeatTimes) // 构建子串
      console.log('tmp', tmp)
      result = tmp
    } else {
      // 遇到字母，追加给result串
      tmp += char
      // 当遇到2[abc]3[cd]ef  这种
      if (strStack.length == 0) {
        result += char
      }
    }
  }
  return result
}
export default decodeString
