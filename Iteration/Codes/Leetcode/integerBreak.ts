/*
 * Description: 343：整数拆分
 * Url: https://leetcode.cn/problems/integer-break/
 * Tags: 数学  动态规划
 * Created: 2023-03-14 23:07:46
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 23:32:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function integerBreak(n: number): number {
  // Think for yourself for 5 minutes...
  // 拆分成k个整数 k>=2
  // 2 =>  1*1 1
  // 3 =>  1*2  1*1*1  2
  // 4 =>  1*2*1 1*1*1*1   4
  // 5 =>  1*1*1*1*1 1*2*2 1*1*1*2 2*3  6
  // 6 =>  3*3 9
  // 考虑一个数i可以被拆分为 j * (i - j)
  // dp[i] = max(dp[i], max((i - j) * j, dp[i - j] * j));
  // j * (i - j) 是单纯的把整数拆分为两个数相乘，而j * dp[i - j]是拆分成两个以及两个以上的个数相乘。

  const dp: number[] = Array(n + 1).fill(0)

  dp[2] = 1

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j)
    }
  }

  return dp[n]
}
export default integerBreak
