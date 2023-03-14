/*
 * Description: 1013：斐波那契数
 * Url: https://leetcode.cn/problems/fibonacci-number/
 * Tags: 递归  记忆化搜索  数学  动态规划
 * Created: 2023-03-14 21:28:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 21:45:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 动态规划版
 * @param n
 */
function fib1(n: number): number {
  // Think for yourself for 5 minutes...
  if (n <= 1) return n

  const dp: number[] = [0, 1]

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}

/**
 * 递归版
 * @param n
 */
function fib2(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2)
}
/**
 * 记忆法递归
 * @param n
 */
function fib(n: number): number {
  const memo = [0, 1]
  const dfs = (n: number) => {
    if (memo[n] != null) {
      return memo[n]
    }
    if (memo[n]) return memo[n]
    memo[n] = dfs(n - 1) + dfs(n - 2)
    return memo[n]
  }
  return dfs(n)
}

export default fib
