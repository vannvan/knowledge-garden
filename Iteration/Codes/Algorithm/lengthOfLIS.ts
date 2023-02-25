/*
 * Description: 最长子序列
 * Created: 2023-02-25 15:36:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 17:12:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 最长子序列长度
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = (nums: number[]): number => {
  const dp = new Array(nums.length).fill(1) // 因为至少有一个
  let res = 1
  for (let i = 0; i < nums.length; i++) {
    console.log(`第${i}轮开始-------`)
    for (let j = 0; j < i; j++) {
      // 寻找nums[0..j-1] 中比 nums[i] 小的元素
      if (nums[i] > nums[j]) {
        console.log('i,j', i, j)
        console.log('num', dp[i], dp[j] + 1)
        // 把 nums[i] 接在后面，即可形成长度为 dp[j] + 1，且以 nums[i] 为结尾的递增子序列
        // dp[i] = Math.max(dp[i], dp[j] + 1)
        dp[i] = dp[i] > dp[j] + 1 ? dp[i] : dp[j] + 1
      }
    }
    if (dp[i] > res) {
      res = dp[i]
    }
    console.log(`第${i}轮结束--------`)
  }
  console.log(dp)

  return res
}

export default lengthOfLIS
