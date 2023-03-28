/*
 * Description: 901：优势洗牌
 * Url: https://leetcode.cn/problems/advantage-shuffle/
 * Tags: 贪心  数组  双指针  排序
 * Created: 2023-03-28 21:03:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 21:17:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function advantageCount(nums1: number[], nums2: number[]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 优势最大化 尽量让nums1[i]的每一位都大于nums2[j]的每一位
  // q2. 将nums1 升序排序，确保在和nums2的每一项对比的过程中尽量选比nums2[i]大但不是最大的数
  nums1.sort((a, b) => a - b)

  const ans: number[] = []

  /**
   * 从nums中找比target大的数
   * @param nums
   * @param target
   */
  const getMax = (nums: number[], target: number) => {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > target) {
        return i
      }
    }
    // 找不到就取第一个
    return 0
  }

  for (let i = 0; i < nums2.length; i++) {
    const idx = getMax(nums1, nums2[i])
    ans.push(nums1[idx])
    // 取一个就删掉一个
    nums1.splice(idx, 1)
  }

  return ans
}
export default advantageCount
