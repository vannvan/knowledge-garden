/*
 * Description: 70：爬楼梯
 * Url: https://leetcode.cn/problems/climbing-stairs/
 * Tags: 记忆化搜索  数学  动态规划
 * Created: 2023-03-14 21:00:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 21:26:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function climbStairs(n: number): number {
  // Think for yourself for 5 minutes...
  // q1.一次可以爬1或2
  // 1 -> 1   种
  // 2 -> 1 1 , 2  2种
  // 3 -> 1 1 1, 1 2, 2 1 3种
  // 4 -> 1 1 1 1, 1 1 2 , 1 2 1, 2 1 1, 2 2  5种
  // 在到达第n层的上一步，我们只有两个选择，走一步，或者走两步。
  // 如果是走一步，我们需要先通过 f(n-1)种方式到达 n-1 层
  // 如果是走两步， 我们需要通过 f(n-2)种方式到达第 n - 2 层
  // 所以综上有 f(n) = f(n-2) + f(n-1)

  const dp: number[] = [1, 2]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n - 1]
}
export default climbStairs
