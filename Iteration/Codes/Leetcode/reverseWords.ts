/*
 * Description: 反转字符串中的单词
 * Url: https://leetcode.cn/problems/reverse-words-in-a-string/
 * Created: 2023-03-02 19:44:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 20:17:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverseWords(s: string): string {
  const reverse = (start, end) => {
    //
  }

  let strArr = s.split('')
  console.log('strArr', strArr)
  // 去除多余空格
  let n = strArr.length
  for (let i = 0; i < n; i++) {
    if (strArr[i] == ' ' && strArr[i - 1] == ' ') {
      strArr.splice(i, 1)
    }
  }
  if (strArr[0] == ' ') {
    strArr.splice(0, 1)
  }

  if (strArr[strArr.length - 1] == ' ') {
    console.log('删除尾部')
    strArr.splice(strArr.length - 1, 1)
  }
  console.log('strArr', strArr)

  let left = 0
  let right = strArr.length - 1
  while (left < right) {
    ;[strArr[left], strArr[right]] = [strArr[right], strArr[left]]
    right--
    left++
  }

  //

  console.log('strArr', strArr)

  return s
}
export default reverseWords
