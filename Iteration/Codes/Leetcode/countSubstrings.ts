/*
 * Description: 647：回文子串
 * Url: https://leetcode.cn/problems/palindromic-substrings/
 * Tags: 字符串  动态规划
 * Created: 2023-03-19 12:43:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 13:08:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function countSubstrings(s: string): number {
  // Think for yourself for 5 minutes...
  // dp[i][j] 表示区间[i,j]范围内的字符是否能构成回文字符串
  // 当s[i]与s[j]相等时，分三种情况
  // a. i=j [a] 这种
  // b. i和j相差为1 [a,a]
  // c. i和j相差大于1 [c,a,b,a,c] 就缩小区间 s[i+1]和s[j-1]是否相等
  // 遍历顺序的确定，如果按照从上到下，从左到右，考虑对于情况c而言 dp[i][j] = s[i+1]和s[j-1] .. 此时要求的结果在当前位置的左下方
  // 显然需要采用从下往上，从左往右的顺序遍历才可以
  const n: number = s.length

  const dp: boolean[][] = Array.from(Array(n), () => Array(n).fill(false))

  let result: number = 0

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      // if (s[i] == s[j]) {
      //   // a b
      //   if (j - i <= 1) {
      //     dp[i][j] = true
      //     result++
      //   } else if (dp[i + 1][j - 1]) {
      //     // c
      //     result++
      //     dp[i][j] = true
      //   }
      // }

      // 简化
      if ((j - i <= 1 || dp[i + 1][j - 1]) && s[i] == s[j]) {
        result++
        dp[i][j] = true
      }
    }
  }

  return result
}
export default countSubstrings
