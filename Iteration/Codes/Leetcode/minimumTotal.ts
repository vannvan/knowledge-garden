/*
 * Description: 120：三角形最小路径和
 * Url: https://leetcode.cn/problems/triangle/
 * Tags: 数组  动态规划
 * Created: 2023-05-04 23:12:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-04 23:59:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minimumTotal(triangle: number[][]): number {
  // Think for yourself for 5 minutes...
  // q1. 相邻的节点 下标与上一层相等或上一层下标+1
  // q2. 当前层取了最小值，下一层取值只能和当前层下标 相同 或 +1
  // q3. 万一当前层取了最小值，下一层的相邻节点不够小，那么当前层更应该取的是和下一层最小值相加和最小的那个值，
  // 所以当前层 最适合取的数 取决于和下一层相加后能否“最小”，环环相扣，因此需要动态规划了。。
  // dp[i][j] 表示从顶部走到[i][j]位置的最小路径和
  // 第一行第一个数肯定是要取的
  // 第二行 只能 0 或 1，
  // 第三行 如果第二行取了0 那么只能 0/1 如果第二行取了 1 那么只能 1/2
  // 第四行 如果第三行取了0 那么只能 0/1 。。 如果第三行取了2 那么只能2/3
  // 那么对于[i][j]位置的最小值 分两种情况 a.上一行[i-1][j]同下标 位置取了 b. 上一行同下标位置没取,那上一行取的就是[i-1][j-1]
  // 那么上一行的最小值就是 min(dp[i-1][j-1],dp[i-1][j])，再加上当前位置的值
  // dp[i][j] = min(dp[i-1][j-1],dp[i-1][j]) + c[i][j]
  //
  const n = triangle.length
  const dp: number[][] = Array.from(Array(n), () => Array(n).fill(0)) // 二维
  dp[0][0] = triangle[0][0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0]
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j]
    }

    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i]
  }

  let minTotal = dp[n - 1][0]
  for (let i = 1; i < n; ++i) {
    minTotal = Math.min(minTotal, dp[n - 1][i])
  }
  return minTotal
}
export default minimumTotal
