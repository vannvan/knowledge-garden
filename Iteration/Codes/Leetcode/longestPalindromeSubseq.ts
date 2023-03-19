/*
 * Description: 516：最长回文子序列
 * Url: https://leetcode.cn/problems/longest-palindromic-subsequence/
 * Tags: 字符串  动态规划
 * Created: 2023-03-19 13:14:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 13:31:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function longestPalindromeSubseq(s: string): number {
  // Think for yourself for 5 minutes...
  // dp[i][j] 表示[i,j]区间最长回文子序列的长度
  // 如果s[i]等于s[j]  那么dp[i][j] = dp[i+1][j-1] + 2
  // 如果不相等 a. 加入s[i]的回文子序列长度 dp[i+1][j] b. 加入s[j]的回文子序列长度 d[i][j-1]
  // 遍历顺序是 从下往上，从左到右，因此右上角才是答案
  // 有递推公式 dp[i][j] = dp[i+1][j-1] + 2 可知，[i][j]位置是有赖于[i-1]和[j-1]的，因此遍历需确保两者>=0
  // 因此内层j从i+1开始

  const n: number = s.length
  const dp: number[][] = Array.from(Array(n), () => Array(n).fill(0))

  // 当i==j时 s[i]===s[j] 等于1 ，对应矩阵斜角线
  for (let i = 0; i < n; i++) dp[i][i] = 1

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[0][n - 1]
}
export default longestPalindromeSubseq
