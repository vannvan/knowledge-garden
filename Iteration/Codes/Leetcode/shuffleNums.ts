/*
 * Description: 384：打乱数组
 * Url: https://leetcode.cn/problems/shuffle-an-array/
 * Tags: 数组  数学  随机化
 * Created: 2023-03-24 18:29:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 18:55:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Solution {
  n: number
  nums: number[]
  rand: any
  constructor(nums: number[]) {
    this.nums = nums
    this.n = nums.length
  }

  reset(): number[] {
    return this.nums
  }

  shuffle(): number[] {
    const copy = this.nums.slice()
    for (let i = 0; i < this.n; ++i) {
      const j = Math.floor(Math.random() * (this.n - i)) + i
      const temp = copy[i]
      copy[i] = copy[j]
      copy[j] = temp
    }

    return copy
  }
}

export default Solution
