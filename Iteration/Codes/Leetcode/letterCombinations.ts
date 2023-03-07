/*
 * Description: 电话号码的字母组合
 * Url: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * Tags: 哈希表  字符串  回溯
 * Created: 2023-03-05 22:05:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 19:48:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function letterCombinations(digits: string): string[] {
  // Think for yourself for 5 minutes...

  const track: string[] = []

  const res: string[] = []

  const arr = [
    '', // 0
    '', // 1
    'abc', // 2
    'def', // 3
    'ghi', // 4
    'jkl', // 5
    'mno', // 6
    'pqrs', // 7
    'tuv', // 8
    'wxyz', // 9
  ]
  const k = digits.length

  // 空字符串
  if (!digits) return []

  if (k === 1) return arr[digits].split('')

  const backTrack = (str: string, startIndex: number) => {
    if (track.length == k) {
      res.push(track.join(''))
      return
    }

    const letter = arr[str[startIndex]]

    // for (let i = 0; i < letter.length; i++) {
    //   track.push(letter[i])
    //   backTrack(str, startIndex + 1)
    //   track.pop()
    // }
    for (const v of letter) {
      track.push(v)
      backTrack(str, startIndex + 1)
      track.pop()
    }
  }

  backTrack(digits, 0)
  console.log('res', res)
  return res
}
export default letterCombinations
