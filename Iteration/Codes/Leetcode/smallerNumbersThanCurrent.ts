/*
 * Description: 1482：有多少小于当前数字的数字
 * Url: https://leetcode.cn/problems/how-many-numbers-are-smaller-than-the-current-number/
 * Tags: 数组  哈希表  计数  排序
 * Created: 2023-03-22 20:44:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:17:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function smallerNumbersThanCurrent1(nums: number[]): number[] {
  // Think for yourself for 5 minutes...

  const n: number = nums.length
  const ans: number[] = Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    const cur = nums[i]

    let p: number = 0
    while (p < n) {
      if (nums[p] < cur && p != i) {
        ans[i]++
      }
      p++
    }
  }
  console.log('ans', ans)

  return ans
}

function smallerNumbersThanCurrent(nums: number[]): number[] {
  const n: number = nums.length
  const ans: number[] = []
  const cnt = new Array(101).fill(0)

  for (const val of nums) {
    cnt[val] = (cnt[val] || 0) + 1
  }

  for (let i = 1; i <= 100; ++i) {
    cnt[i] += cnt[i - 1]
  }

  for (let i = 0; i < n; ++i) {
    ans.push(nums[i] ? cnt[nums[i] - 1] : 0)
  }
  console.log('ans', ans)
  return ans
}

export default smallerNumbersThanCurrent
