/*
 * Description:  背包问题
 * Created: 2023-02-23 23:05:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 09:08:50
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

export default knapSack
