/*
 * Description: 96：不同的二叉搜索树
 * Url: https://leetcode.cn/problems/unique-binary-search-trees/
 * Tags: 树  二叉搜索树  数学  动态规划  二叉树
 * Created: 2023-04-10 22:40:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 22:54:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function numTrees1(n: number): number {
  // Think for yourself for 5 minutes...
  const dp = Array(n + 1).fill(0)

  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }

  return dp[n]
}

const map = new Map()
function numTrees(n: number): number {
  if (n === 0 || n === 1) return 1
  if (map.has(n)) return map.get(n)

  let count = 0

  for (let i = 1; i <= n; i++) {
    let leftNum = numTrees(i - 1)
    let rightNum = numTrees(n - i)
    count += leftNum * rightNum
  }
  map.set(n, count)

  return count
}

export default numTrees
