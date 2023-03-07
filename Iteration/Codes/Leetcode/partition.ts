/*
 * Description: 分割回文串
 * Url: https://leetcode.cn/problems/palindrome-partitioning/
 * Tags: 字符串  动态规划  回溯
 * Created: 2023-03-07 20:29:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 21:03:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const isPalindrome = (s: string, l: number, r: number) => {
  for (let i = l, j = r; i < j; i++, j--) {
    if (s[i] !== s[j]) return false
  }
  return true
}

function partition(s: string): string[][] {
  // Think for yourself for 5 minutes...

  const res: string[][] = []

  const track: string[] = []

  const backTrack = (str: string, startIndex: number) => {
    if (startIndex == s.length) {
      console.log('startIndex', startIndex, track)
      res.push([...track])
      return
    }

    for (let i = startIndex; i < str.length; i++) {
      if (!isPalindrome(s, startIndex, i)) continue

      track.push(s.slice(startIndex, i + 1))

      backTrack(str, i + 1)

      track.pop()
    }
  }

  backTrack(s, 0)
  console.log('res', res)
  return res
}
export default partition
