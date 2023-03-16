/*
 * Description: 416：分割等和子集
 * Url: https://leetcode.cn/problems/partition-equal-subset-sum/
 * Tags: 数组  动态规划
 * Created: 2023-03-15 20:48:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 11:09:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function canPartition(nums: number[]): boolean {
  // Think for yourself for 5 minutes...
  // q1. 分割成两个数组，两个数组的和相等，那两个数组的各自的和肯定是原数组总和的一半
  // 那只需要确定原数组中存在能够构成sum/2的子集就可以
  // q2. 如果sum是奇数 不可能分为两个总和相等的数组
  // q3. nums的长度必须大于2
  // q4. 如果最大元素大于sum/2 也不可能划分为两个数组
  //
  const sum: number = nums.reduce((pre, cur) => pre + cur)
  if (sum % 2 === 1) return false
  const bagSize: number = sum / 2
  const goodsNum: number = nums.length
  const dp: number[] = new Array(bagSize + 1).fill(0)
  for (let i = 0; i < goodsNum; i++) {
    for (let j = bagSize; j >= nums[i]; j--) {
      const w = j - nums[i] // 容量为j-nums[i]时，不放num[i]的最大值
      dp[j] = Math.max(dp[j], dp[w] + nums[i])
    }
  }
  return dp[bagSize] === bagSize
}

function canPartition2(nums: number[]): boolean {
  const sum: number = nums.reduce((prev, curr) => prev + curr)

  if (sum % 2 === 1) return false

  const bagSize: number = sum / 2
  const weightArr: number[] = nums
  const valueArr: number[] = nums

  const goodsNum: number = weightArr.length

  const dp: number[][] = new Array(goodsNum).fill(0).map((_) => new Array(bagSize + 1).fill(0))

  for (let i = weightArr[0]; i <= bagSize; i++) {
    dp[0][i] = valueArr[0]
  }

  for (let i = 1; i < goodsNum; i++) {
    for (let j = 0; j <= bagSize; j++) {
      // 当目前j背包容量不够
      if (j < weightArr[i]) {
        dp[i][j] = dp[i - 1][j]
      } else {
        const w = j - weightArr[i] // 容量为j - weightArr[i]的时候不放物品i的最大价值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][w] + valueArr[i])
      }
    }
  }

  return dp[goodsNum - 1][bagSize] === bagSize
}

export default canPartition
