/*
 * Description: 384：打乱数组
 * Url: https://leetcode.cn/problems/shuffle-an-array/
 * Tags: 数组  数学  随机化
 * Created: 2023-03-24 18:29:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 18:43:15
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
    this.rand = Math.random()
  }

  reset(): number[] {
    return this.nums
  }

  shuffle(): number[] {
    const copy = this.nums.slice() // 拷贝一份原数组
    for (var i = 0; i < this.n; i++) {
      // 生成一个 [i, n-1] 区间内的随机整数
      var r = i + Math.floor(this.rand * (this.n - i))
      var temp = copy[i]
      copy[i] = copy[r]
      copy[r] = temp
    }

    return copy
  }
}

export default Solution
