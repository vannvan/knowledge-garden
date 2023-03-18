/*
 * Description: 583：两个字符串的删除操作
 * Url: https://leetcode.cn/problems/delete-operation-for-two-strings/
 * Tags: 字符串  动态规划
 * Created: 2023-03-18 21:24:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 21:38:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minDistance(word1: string, word2: string): number {
  // Think for yourself for 5 minutes...
  // q1. 考虑要使两个字符串相等每次可以删掉一个数据
  // q2 dp[i][j]的含义是 以i-1结尾的word1，和以j-1结尾的word2，要达到相等需要删除的最少次数
  // 当word1[i-1] 和 word2[j-1] 相等的时候 dp[i][j] = dp[i-1][j-1]
  // 当word1[i-1] 和 word2[j-1]不想等的时候 分三种删除方式,取最小值
  // a. 删除word1[i-1]  -> dp[i-1][j]+1
  // b. 删除word2[j-1] -> dp[i][j-1]+1
  // c. 两个都删除 -> dp[i-1][j-1] + 2 因为 dp[i][j - 1] + 1 = dp[i - 1][j - 1] + 2 因此这种可以去除

  const [m, n] = [word1.length, word2.length]

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i // 要使以i-1结尾的word1和空字符串匹配，需要删除i个字符
  for (let j = 0; j <= n; j++) dp[0][j] = j // 要使空字串和j-1结尾的word2匹配，需要删除j个字符

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1)
      }
    }
  }

  return dp[m][n]
}
export default minDistance
