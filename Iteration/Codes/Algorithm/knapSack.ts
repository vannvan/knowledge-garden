/*
 * Description:  背包问题
 * Created: 2023-02-23 23:05:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 17:11:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 获取最大价值组合的物品位置
 * @param n 最大个数
 * @param capacity 容量
 * @param KW 最佳组合矩阵
 * @param weights 重量
 * @param values 价值
 */
const findMaxValue = (
  n: number,
  capacity: number,
  KW: number[][],
  weights: number[],
  values: number[]
) => {
  let i = n
  let w = capacity
  // 当剩余数量和容量都大于0就执行循环
  while (i > 0 && w > 0) {
    if (KW[i][w] !== KW[i - 1][w]) {
      console.log(`物品 ${i} 可以是解的一部分 w,v: ${weights[i - 1]}, ${values[i - 1]};`)
      i--
      w = w - KW[i][w]
    } else {
      i-- // 继续往上找
    }
  }
}

/**
 *
 * @param weights 物品重量
 * @param values 物品的价值
 * @param capacity 背包容量
 * @param n 物品数量
 * @returns []
 */
const knapSack = (weights: number[], values: number[], capacity: number, n: number) => {
  // 初始化所有子方案矩阵
  const KW: number[][] = []

  for (let i = 0; i <= n; i++) {
    KW[i] = []
  }
  // i是将要装的物品数量
  for (let i = 0; i <= n; i++) {
    // w 将要装的物品容量
    for (let w = 0; w <= capacity; w++) {
      // 当数量为0 表示什么都不装，当容量为0，表示什么都装不下，矩阵第一行第一列统一为0
      if (i == 0 || w == 0) {
        KW[i][w] = 0
        // 此处的含义是装了w之后 还剩下的容量的处理方式
      } else if (weights[i - 1] <= w) {
        // 物品i的重量必须小于约束容量
        // planA 的含义是 装了当前物品的价值+前i-1的最佳组合的价值
        const planA = values[i - 1] + KW[i - 1][w - weights[i - 1]] //
        // planB 的含义是 不装当前物品 直接取前i-1的最佳组合
        const planB = KW[i - 1][w] //
        KW[i][w] = planA > planB ? planA : planB
      } else {
        KW[i][w] = KW[i - 1][w]
      }
    }
  }

  findMaxValue(n, capacity, KW, weights, values)
  // console.log(KW)
  console.log('最佳组合的最大价值为', KW[n][capacity])
  return KW[n][capacity]
}

/**
 * 只限制个数算最大价值的01背包
 * @param weights 重量
 * @param values 价值
 * @param size 个数
 * @returns
 */
function weightBagProblem(weights: number[], values: number[], size: number) {
  const len = weights.length,
    dp = Array(size + 1).fill(0)
  for (let i = 0; i < len; i++) {
    for (let j = size; j >= weights[i]; j--) {
      // dp[j - weight[i]]表示容量为j - weight[i]的背包所背的最大价值。
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
    }
  }
  return dp[size]
}
/**
 * 未优化
 * @param weight
 * @param value
 * @param size
 * @returns
 */
function weightBagProblemNormal(weight, value, size) {
  // 定义 dp 数组
  const len = weight.length,
    dp = Array(len)
      .fill([])
      .map(() => Array(size + 1).fill(0))

  // 初始化
  for (let j = weight[0]; j <= size; j++) {
    dp[0][j] = value[0]
  }

  // weight 数组的长度len 就是物品个数
  for (let i = 1; i < len; i++) {
    // 遍历物品
    for (let j = 0; j <= size; j++) {
      // 遍历背包容量
      if (j < weight[i]) dp[i][j] = dp[i - 1][j]
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
    }
  }

  console.table(dp)

  return dp[len - 1][size]
}

export { knapSack, weightBagProblem, weightBagProblemNormal }
