/*
 * Description: 1605：制作 m 束花所需的最少天数
 * Url: https://leetcode.cn/problems/minimum-number-of-days-to-make-m-bouquets/
 * Tags: 数组  二分查找
 * Created: 2023-03-27 23:34:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 23:56:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * days天数是否能制作m*k所需要的花朵数
 * @param bloomDay
 * @param days 尝试的天数
 * @param m 需要制作的花束数量
 * @param k 需要相邻的数量
 * @returns
 */
function verification(bloomDay: number[], days: number, m: number, k: number) {
  let flowers = 0
  let count = 0 // 可以制作的花束数量
  for (let i = 0; i < bloomDay.length && count < m; i++) {
    if (bloomDay[i] <= days) {
      flowers++
      // 满足制作一束花的条件l
      if (flowers == k) {
        count++
        flowers = 0 // 制作完一束，重新开始计算
      }
    } else {
      // 当i位置不满足天数时即花朵不连续了，需要置为0
      flowers = 0
    }
  }

  return count >= m
}

/**
 * 最少天数
 * @param bloomDay  bloomDay[i] 第i朵花开的时间
 * @param m 花束
 * @param k 相邻的k朵
 * @returns
 */
function minDays(bloomDay: number[], m: number, k: number): number {
  // Think for yourself for 5 minutes...
  // 设n=bloomDay.length
  // q1. n必须>=m*k 才足够制作需要的花束
  // q2. 天数最小应该是min(bloomDay) 最多应该是max(bloomDay)
  if (m > bloomDay.length / k) {
    return -1
  }
  let left = Math.min(...bloomDay)
  let right = Math.max(...bloomDay)
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (verification(bloomDay, mid, m, k)) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}
export default minDays
