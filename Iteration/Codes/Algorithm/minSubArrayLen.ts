/*
 * Description: 长度最小的子数组
 * https://leetcode.cn/problems/minimum-size-subarray-sum/
 * Created: 2023-02-26 16:42:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 20:15:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minSubArrayLen(target: number, nums: number[]): number {
  let result = Number.MAX_SAFE_INTEGER
  let sublen = 0
  let sum = 0 // startIndex到nums[i]之间元素的和
  let startIndex = 0 // 滑动窗口起始位置
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    while (sum >= target) {
      sublen = i - startIndex + 1 // 子序列长度
      result = result > sublen ? sublen : result
      // sum -= nums[startIndex++] // 一直从头找到尾，看后面是否有比前面更短的子数组
      // 更好理解的写法
      sum = sum - nums[startIndex]
      startIndex++
    }
  }
  return result === Number.MAX_SAFE_INTEGER ? 0 : result
}

/**
 * 另一种写法
 * @param target
 * @param nums
 * @returns
 */
function minSubArrayLen2(target: number, nums: number[]): number {
  let result = Number.MAX_SAFE_INTEGER
  let start = 0
  let end = 0
  let sum = 0
  while (end < target) {
    sum += nums[end]
    while (sum >= target) {
      result = Math.min(result, end - start + 1)
      sum -= nums[start]
      start++
    }
    end++
  }

  return result === Number.MAX_SAFE_INTEGER ? 0 : result
}

export { minSubArrayLen, minSubArrayLen2 }
