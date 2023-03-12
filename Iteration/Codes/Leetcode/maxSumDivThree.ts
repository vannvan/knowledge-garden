/*
 * Description: 1388：可被三整除的最大和
 * Url: https://leetcode.cn/problems/greatest-sum-divisible-by-three/
 * Tags: 贪心  数组  动态规划
 * Created: 2023-03-12 21:10:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 22:15:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
// 不对
function maxSumDivThree1(nums: number[]): number {
  // Think for yourself for 5 minutes...
  // q1. 肯定是选的越多越好
  // q2. 需要满足x % 3 === 0
  // q3. 前面遇到的数有没有可能在后面要被抛弃的？

  let sum: number = 0

  const n: number = nums.length
  let tmp: number[] = []

  for (let i = 0; i < n; i++) {
    if (nums[i] % 3 === 0) {
      sum += nums[i]
    } else {
      tmp.push(nums[i])
    }
  }

  console.log('sum', sum)

  let index: number = 0
  while (index < tmp.length) {
    let subNum: number[] = [...tmp].slice(index, tmp.length)

    console.log('subNum', subNum, index)
    let a = subNum.reduce((prev, curr) => prev + curr)
    if (a % 3 === 0) {
      sum += a
      // index = tmp.length
    }
    index++
  }

  console.log('sum', sum)

  return sum
}

function maxSumDivThree(nums: number[]): number {
  // 取余为1的数
  const arr1 = nums.filter((item) => item % 3 === 1).sort((a, b) => a - b)

  // 取余为2的数
  const arr2 = nums.filter((item) => item % 3 === 2).sort((a, b) => a - b)

  let sum = nums.reduce((prev, curr) => prev + curr)

  if (sum % 3 == 0) {
    return sum
  } else if (sum % 3 === 1) {
    // 为1: 找到sum减去余数为1的最小值或者两个余数为2的最小值（比较）
    sum = Math.max(sum - arr1[0] || 0, sum - arr2[0] - arr2[1] || 0)
  } else {
    // 为2: 找到sum减去余数为2的最小值或者两个余数为1的最小值（比较）
    sum = Math.max(sum - arr2[0] || 0, sum - arr1[0] - arr1[1] || 0)
  }

  return sum
}

export default maxSumDivThree
