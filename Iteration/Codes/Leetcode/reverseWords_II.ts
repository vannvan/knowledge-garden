/*
 * Description: 557：反转字符串中的单词 III
 * Url: https://leetcode.cn/problems/reverse-words-in-a-string-iii/
 * Tags: 双指针  字符串
 * Created: 2023-03-26 20:32:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 20:51:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverseWords(s: string): string {
  // Think for yourself for 5 minutes...

  const reverse = (s: string[], start: number, end: number) => {
    while (start < end) {
      let temp = s[start]
      s[start] = s[end]
      s[end] = temp
      start++
      end--
    }
    return s
  }

  let strArr = s.split('')

  let start = 0

  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === ' ') {
      reverse(strArr, start, i - 1)
      start = i + 1
    }
    if (i == strArr.length - 1) {
      reverse(strArr, start, strArr.length - 1)
    }
  }

  return strArr.join('')
}
export default reverseWords
