/*
 * Description: 392：判断子序列
 * Url: https://leetcode.cn/problems/is-subsequence/
 * Tags: 双指针  字符串  动态规划
 * Created: 2023-03-18 20:26:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 20:39:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isSubsequence(s: string, t: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. s为t的子序列，s长度一定<=t的长度
  // q2. 一定满足s和t的公共子序列长度为s的长度
  // 当 i-1 == j-1的字符时更新值
  // 当不等于时 t需要删减元素了

  const [m, n] = [s.length, t.length]

  const dp: number[][] = Array.from(Array(m + 1), () => Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = dp[i][j - 1]
      }
    }
  }

  return dp[m][n] === m
}
export default isSubsequence
