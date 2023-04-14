/*
 * Description: 58：最后一个单词的长度
 * Url: https://leetcode.cn/problems/length-of-last-word/
 * Tags: 字符串
 * Created: 2023-04-14 20:54:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 20:58:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function lengthOfLastWord(s: string): number {
  // Think for yourself for 5 minutes...
  let tmp = '' // 记录每一个无空格的单词
  let res = [] // 存储每一个去除空格的单词
  s += ' '
  for (const s1 of s) {
    // 如果遇到了一个空格
    if (s1 === ' ') {
      // 且tmp有值，说明在这个空字符串之前已经有了一个单词
      if (tmp.length > 0) {
        res.push(tmp)
        tmp = '' // 清空tmp开始准备下一个单词
      }
    } else {
      tmp += s1
    }
  }

  if (res.length === 0) return 0
  return res[res.length - 1].length
}
export default lengthOfLastWord
