/*
 * Description: 1105：不相交的线
 * Url: https://leetcode.cn/problems/uncrossed-lines/
 * Tags: 数组  动态规划
 * Created: 2023-03-18 17:24:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 17:33:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  // Think for yourself for 5 minutes...

  // q1. 不能相交， 约等于求两个数组的公共子序列
  // 直线不相交，说明字符串A中存在字符串B的子序列，且子序列不能改变相对顺序，顺序不变的情况下，连接数字的直线就不会相交
  const [m, n] = [nums1.length, nums2.length]

  const dp: number[][] = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[m][n]
}
export default maxUncrossedLines
