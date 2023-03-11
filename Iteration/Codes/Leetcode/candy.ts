/*
 * Description: 135：分发糖果
 * Url: https://leetcode.cn/problems/candy/
 * Tags: 贪心  数组
 * Created: 2023-03-09 23:22:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 16:15:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 不对，没有考虑三连升序的情况
 * @param ratings
 * @returns
 */
function candy1(ratings: number[]): number {
  // Think for yourself for 5 minutes...

  let arr = new Array(ratings.length)

  arr[0] = 1

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      arr[i] = 2
      arr[i - 1] = 1
    } else if (ratings[i] < ratings[i - 1]) {
      arr[i] = 1
      arr[i - 1] = 2
    } else {
      arr[i] = 1
    }
  }

  return arr.reduce((prev, curr) => prev + curr)
}

/**
 * 有效解
 * @param ratings
 * @returns
 */
function candy2(ratings: number[]): number {
  const n = ratings.length

  let res: number = 1 // 以最少的开始计数，第一个同学就是1个了，因此下面i从1开始
  let inc: number = 1 // 递增序列长度
  let dec: number = 0 // 递减序列长度
  let pre: number = 1

  for (let i = 1; i < n; i++) {
    // 说明呈递增
    if (ratings[i] >= ratings[i - 1]) {
      dec = 0
      pre = ratings[i] == ratings[i - 1] ? 1 : pre + 1
      res += pre
      inc = pre
    } else {
      dec++ // 递减
      if (dec == inc) {
        dec++
      }
      res += dec
      pre = 1
    }
  }

  return res
}

/**
 * 有效解
 * @param ratings
 * @returns
 */
function candy(ratings: number[]): number {
  const solution: number[] = new Array(ratings.length).fill(1)
  // 从前往后
  for (let i = 1; i < ratings.length; i++) {
    // 当前孩子评分高于前一个孩子，当前孩子就比前一个孩子多一个糖果
    if (ratings[i] > ratings[i - 1]) {
      solution[i] = solution[i - 1] + 1
    }
  }

  // 从后往前
  for (let i = ratings.length - 1; i >= 0; i--) {
    // 当前孩子评分高于后一个孩子
    if (ratings[i] > ratings[i + 1]) {
      solution[i] = Math.max(solution[i], solution[i + 1] + 1)
    }
  }

  return solution.reduce((prev, curr) => prev + curr)
}

export default candy
