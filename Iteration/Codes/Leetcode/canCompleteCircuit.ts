/*
 * Description: 134：加油站
 * Url: https://leetcode.cn/problems/gas-station/
 * Tags: 贪心  数组
 * Created: 2023-03-11 15:17:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 16:04:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 *
 * @param gas 加油站汽油量
 * @param cost 需要消耗的量
 * @returns
 */
function canCompleteCircuit1(gas: number[], cost: number[]): number {
  // Think for yourself for 5 minutes...

  let curSum: number = 0 // 不断在每一站迭代的

  let min: number = Number.MAX_SAFE_INTEGER // 油箱里的剩余值

  // 每走完一站消耗完剩余的加上这一站可以加的 curSum = curSum + cost[i] - gas[i]
  // q1. 返回加油站的编号
  // q2. 如果加油站油量小于需要的总和 返回-1
  // q3. 如果从0开始，从0开始，最后剩余>=0 那么0点就是起点
  // q4. 如果0点不是起点，从加油站后往前找，第一个可以把剩余填满的就是起点

  for (let i = 0; i < gas.length; i++) {
    let a = gas[i] - cost[i]
    curSum += a
    if (curSum < min) {
      min = curSum
    }
  }

  if (curSum < 0) return -1 // 走不完
  if (min >= 0) return 0 // 剩余大于0 可以从0点走

  for (let i = gas.length - 1; i >= 0; i--) {
    let a = gas[i] - cost[i] // 走完第i站消耗完的剩余的
    min += a
    if (min >= 0) {
      return i
    }
  }

  return -1
}

/**
 * 从0开始不断尝试更换更适合的起点的思路
 * @param gas
 * @param cost
 * @returns
 */
function canCompleteCircuit2(gas: number[], cost: number[]): number {
  let startIndex: number = 0

  let curSum: number = 0

  let totalSum: number = 0

  // 从0开始如果[0,i]区间出现负值，说明i不能作为起点，起点不断往后移动
  for (let i = 0; i < gas.length; i++) {
    curSum = gas[i] - cost[i]
    totalSum += gas[i] - cost[i]

    if (curSum < 0) {
      startIndex = i + 1
      curSum = 0
    }
  }

  if (totalSum < 0) return -1
  return startIndex
}

/**
 * 暴力解法
 * @param gas
 * @param cost
 */
function canCompleteCircuit(gas: number[], cost: number[]): number {
  for (let i = 0; i < gas.length; i++) {
    let a = gas[i] - cost[i] // 剩余
    let index = (i + 1) % cost.length
    // 模拟以i为起点行驶一圈
    while (a > 0 && index != i) {
      a += gas[index] - cost[index]
      index = (index + 1) % cost.length
    }
    // 如果以i为起点跑一圈，剩余油量大于0，说明i点符合起点
    if (a >= 0 && index === i) return i
  }

  return -1
}
export default canCompleteCircuit
