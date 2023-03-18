/*
 * Description: 115：不同的子序列
 * Url: https://leetcode.cn/problems/distinct-subsequences/
 * Tags: 字符串  动态规划
 * Created: 2023-03-18 20:47:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 21:11:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function numDistinct(s: string, t: string): number {
  // Think for yourself for 5 minutes...
  // dp[i][j]：以i-1为结尾的s子序列中出现以j-1为结尾的t的个数
  // s[i-1] ==t[i-1] 时 分两种情况 a. 用s[i-1]匹配，那么dp[i-1][j-1] b. 不用s[i-1]匹配，dp[i-1][j]
  // 例如 s：bagg 和 t：bag 对于s[2]和s[3]是相同的，可以选择用或不用[2],[3] 因为他们各自会构成一个结果
  // s[i-1]!=t[i-1] 时，dp[i-1][j]
  // dp[i][0] 表示 s中任意i-1结尾的位置删除元素，出现空字符串的个数，全是 1
  // dp[0][j] 表示 空字符串随意删除元素，出现t中j结尾的字符串个数，全是0

  const [m, n] = [s.length, t.length]

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = 1
  for (let j = 1; j <= n; j++) dp[0][1] = 0 // 可以省略

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  return dp[m][n]
}
export default numDistinct
