/*
 * Description: 字母大小写全排列
 * Url: https://leetcode.cn/problems/letter-case-permutation/
 * Tags: 位运算  字符串  回溯
 * Created: 2023-03-08 11:31:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:41:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function letterCasePermutation(s: string): string[] {
  // Think for yourself for 5 minutes...

  const res: string[] = []

  const isDigit = (ch: string) => {
    return parseFloat(ch).toString() === 'NaN' ? false : true
  }

  const backTrack = (str: string[], startIndex: number) => {
    // 已a1b2为例
    // 这里上来就先会把原数组放进去
    // 第二次进来是 [ 'A', '1', 'b', '2' ]
    // 第三次进来是 [ 'A', '1', 'B', '2' ]
    // 第四次进来是 [ 'a', '1', 'B', '2' ]
    if (str.length == s.length) {
      res.push([...str].join(''))
    }

    for (let i = startIndex; i < str.length; i++) {
      // 遇到数字跳过
      if (isDigit(str[i])) {
        continue
      }
      // 这一步可以将小写变大写
      str[i] = String.fromCharCode(str[i].charCodeAt(0) ^ 32)
      backTrack(str, i + 1)
      // 这一步将大写变成小写
      str[i] = String.fromCharCode(str[i].charCodeAt(0) ^ 32)
    }
  }

  backTrack(s.split(''), 0)
  console.log('res', res)
  return res
}
export default letterCasePermutation
