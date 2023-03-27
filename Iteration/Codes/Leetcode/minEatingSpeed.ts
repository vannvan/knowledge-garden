/*
 * Description: 907：爱吃香蕉的珂珂
 * Url: https://leetcode.cn/problems/koko-eating-bananas/
 * Tags: 数组  二分查找
 * Created: 2023-03-27 22:54:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 23:30:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 判断以K速度能否在H小时内吃完所有香蕉
 * @param piles
 * @param H 限制小时
 * @param K 速度
 * @returns
 */
function verification(piles: number[], H: number, K: number) {
  let countHour = 0

  for (let i = 0; i < piles.length; i++) {
    // 当前这堆香蕉小于K，那可以直接算一个小时
    if (piles[i] <= K) {
      countHour += 1
    } else {
      // 大于那就得除以速度了，ceil向上去整呗
      countHour += Math.ceil(piles[i] / K)
    }

    // 如果吃的时间已经超过警卫回来的时间了
    if (countHour > H) {
      return false
    }
  }

  return true
}

function minEatingSpeed(piles: number[], h: number): number {
  // Think for yourself for 5 minutes...
  // q1. 吃掉所有香蕉的最小速度
  // q2. 每小时最多吃一堆香蕉 速度范围应该是 1 到 最大值
  let left = 1
  let right = Math.max(...piles)

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (verification(piles, h, mid)) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}
export default minEatingSpeed
