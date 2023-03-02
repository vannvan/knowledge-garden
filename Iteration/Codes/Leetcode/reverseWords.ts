/*
 * Description: 反转字符串中的单词
 * Url: https://leetcode.cn/problems/reverse-words-in-a-string/
 * Created: 2023-03-02 19:44:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 22:19:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverseWords(s: string): string {
  // 反转指定区间的自负
  const reverse = (start: number, end: number) => {
    while (start < end) {
      ;[strArr[start], strArr[end]] = [strArr[end], strArr[start]]
      end--
      start++
    }
  }

  let strArr = s.split('')
  // console.log('strArr', strArr)
  // 1.去除多余空格,不对
  // let n = strArr.length
  // for (let i = 0; i < n; i++) {
  //   if (strArr[i] == ' ' && strArr[i - 1] == ' ') {
  //     strArr.splice(i, 1)
  //   }
  // }

  // 1.去除多余空格，连续超过一个的
  let index = 0
  while (index < strArr.length) {
    if (strArr[index] === ' ' && strArr[index + 1] === ' ') {
      strArr.splice(index + 1, 1)
    } else {
      index++
    }
  }

  // 删除首位的空格
  if (strArr[0] == ' ') {
    strArr.splice(0, 1)
  }

  if (strArr[strArr.length - 1] == ' ') {
    strArr.splice(strArr.length - 1, 1)
  }
  console.log('strArr', strArr)
  // 2. 整体反转
  reverse(0, strArr.length - 1)
  // console.log('strArr', strArr)

  // 3.单词反转
  let start = 0
  for (let i = 0; i <= strArr.length; i++) {
    if (strArr[i] === ' ' || i === strArr.length) {
      // 翻转单词
      reverse(start, i - 1)
      start = i + 1
    }
  }
  // console.log('strArr', strArr.join(''))

  return strArr.join('')
}
export default reverseWords
