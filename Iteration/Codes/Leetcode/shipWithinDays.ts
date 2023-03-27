/*
 * Description: 1056：在 D 天内送达包裹的能力
 * Url: https://leetcode.cn/problems/capacity-to-ship-packages-within-d-days/
 * Tags: 数组  二分查找
 * Created: 2023-03-27 21:54:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-27 22:40:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function shipWithinDays1(weights: number[], days: number): number {
  // Think for yourself for 5 minutes...
  // q1. 必须按顺序装
  // q2. 要刚好够days天
  // q3. 返回最低运载能力
  // q4. 最低运载能力肯定是要大于所有货物的最大值的   最高运载能力肯定是小于所有货物总重量的

  let left = Math.max(...weights)
  let right = weights.reduce((prev, curr) => prev + curr)

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    let needDay = 1
    let curr = 0 // 当前这一天已经运送的重量之和
    for (const weight of weights) {
      if (curr + weight > mid) {
        needDay++
        curr = 0
      }
      curr += weight
    }
    console.log('curr', curr, 'needDay', needDay)
    if (needDay <= days) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}

/**
 * 判断当前荷载是否能够在D天内送达
 * @param weights
 * @param D 需要的天数
 * @param H
 * @returns
 */
function verification(weights: number[], D: number, H: number) {
  let countDay = 1
  let singleWeight = 0
  for (let i = 0; i < weights.length; i++) {
    singleWeight += weights[i]
    //如果累计包裹总量singleWeight > H，天数+1
    if (singleWeight > H) {
      countDay++
      singleWeight = weights[i]
    }
    //如果当前累计的天数count > D，说明当前H不满足条件，返回false
    if (countDay > D) {
      return false
    }
  }

  return true
}

function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights)
  let right = weights.reduce((prev, curr) => prev + curr)

  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    // 尝试以mid荷载去模拟装所有的包裹，如果能装完且天数小于days说明mid是一种可以满足的运载能力
    // 但要求输出最低运载能力，因此将右指针逼近左侧，尝试去找更小的
    // 如果mid满足verification，则逼近右指针
    if (verification(weights, days, mid)) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}

export default shipWithinDays
