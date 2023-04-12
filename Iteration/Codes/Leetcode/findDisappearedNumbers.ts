/*
 * Description: 448：找到所有数组中消失的数字
 * Url: https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/
 * Tags: 数组  哈希表
 * Created: 2023-04-12 21:27:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-12 21:59:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对不对
function findDisappearedNumbers1(nums: number[]): number[] {
  // Think for yourself for 5 minutes...
  nums = nums.sort((a, b) => a - b)

  const ans: Set<number> = new Set()
  let p = 1
  while (p < nums.length) {
    console.log('p', p)
    if (nums[p] == nums[p + 1]) {
      p++
      continue
    }
    if (nums[p] != p) {
      ans.add(p)
    }
    p++
  }

  console.log('ans', ans)

  return []
}

function findDisappearedNumbers(nums: number[]): number[] {
  const n = nums.length
  // for (const num of nums) {
  //   const x = (num - 1) % n
  //   console.log(x)
  //   nums[x] += n // 将num-1下标位置的数+n放入到nums数组中
  // }

  for (let i = 0; i < nums.length; i++) {
    const x = (nums[i] - 1) % n
    nums[x] += n
  }

  const ans = []
  // 在区间[1,n]内，从0开始，目标数字应该就是i+1
  for (let i = 0; i < nums.length; i++) {
    // 上面把i位置的数
    if (nums[i] <= n) {
      ans.push(i + 1)
    }
  }

  return ans
}
export default findDisappearedNumbers
