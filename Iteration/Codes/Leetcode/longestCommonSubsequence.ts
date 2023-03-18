/*
 * Description: 1250：最长公共子序列
 * Url: https://leetcode.cn/problems/longest-common-subsequence/
 * Tags: 字符串  动态规划
 * Created: 2023-03-18 16:25:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 16:49:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function longestCommonSubsequence(text1: string, text2: string): number {
  // Think for yourself for 5 minutes...
  // q1. 子序列，不需要连续的
  // q2. dp[i][j]：长度为[0, i - 1]的字符串text1与长度为[0, j - 1]的字符串text2的最长公共子序列为dp[i][j]
  // 对于dp[i][j] 在对比过程中存在 text1[i-1]和text2[j-1] ，存在两种情况
  // a. 相同 dp[i][j] = dp[i-1][j-1]+1
  // b. 不同 就取text1[0,i-2]和text2[0,j-1] 或text1[0,i-1]和text2[0,j-2]的最长子序列，即max(dp[i-1][j],dp[i][j-1])
  // dp[0][i] 为0  dp[j][0] 为0

  const [m, n] = [text1.length, text2.length]

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}
export default longestCommonSubsequence
