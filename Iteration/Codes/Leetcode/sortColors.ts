/*
 * Description: 75：颜色分类
 * Url: https://leetcode.cn/problems/sort-colors/
 * Tags: 数组  双指针  排序
 * Created: 2023-03-15 22:45:43
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 23:00:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): number[] {
  // Think for yourself for 5 minutes...

  const n: number = nums.length

  const swap = (nums: number[], i, j) => {
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }

  let pre: number = 0
  // 先把0都换到最前面
  for (let i = 0; i < n; ++i) {
    if (nums[i] === 0) {
      swap(nums, i, pre)
      ++pre
    }
  }

  // 再把1换到前面 此时pre已经是最后一个0之后+1的位置了
  for (let i = pre; i < n; ++i) {
    if (nums[i] === 1) {
      swap(nums, i, pre)
      ++pre
    }
  }
  console.log(nums)
  return nums
}
export default sortColors
