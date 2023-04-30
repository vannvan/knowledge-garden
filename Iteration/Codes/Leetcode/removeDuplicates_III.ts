/*
 * Description: 80：删除有序数组中的重复项 II
 * Url: https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/
 * Tags: 数组  双指针
 * Created: 2023-04-30 22:44:00
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-01 00:23:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function removeDuplicates(nums: number[]): number {
  // Think for yourself for 5 minutes...
  const n = nums.length
  if (n <= 2) {
    return n
  }
  let slow = 2
  let fast = 2
  while (fast < nums.length) {
    if (nums[slow - 2] !== nums[fast]) {
      nums[slow] = nums[fast]
      slow++
    }
    // console.log(`前->当前fast ${nums[fast]},fast-2 ${nums[fast - 2]} 当前slow ${slow}`)
    // 行不通
    // if (nums[fast - 2] !== nums[fast]) {
    //   console.log(`当前fast下标${fast},元素为${nums[fast]}`)
    //   nums[slow] = nums[fast]
    //   slow++
    // } else {
    //   console.log(`绕过的下标${fast},元素为${nums[fast]},此时数组元素${nums}`)
    // }

    console.log('nus', nums.slice(0, slow))
    fast++
    // console.log(`后->当前fast ${nums[fast]},fast-2 ${nums[fast - 2]} 当前slow ${slow}`)
  }

  return slow
}

function removeDuplicates1(nums: number[]): number {
  const n = nums.length
  if (n === 0) {
    return 0
  }
  let j = 2
  // nums[0,j) 有序且值唯一
  // j表示下一个需要赋值的元素
  for (let i = 2; i < n; i++) {
    if (nums[i] !== nums[j - 2]) {
      nums[j] = nums[i]
      j++
    }
  }
  return j
}

function removeDuplicates2(nums: number[]): number {
  function removeCommon(nums: number[], k: number) {
    let len = 0
    for (const num of nums) {
      if (len < k || nums[len - k] != num) {
        nums[len++] = num
      }
    }
    return len
  }
  return removeCommon(nums, 2)
}

export { removeDuplicates, removeDuplicates1, removeDuplicates2 }
