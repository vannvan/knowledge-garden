/*
 * Description: 496：下一个更大元素 I
 * Url: https://leetcode.cn/problems/next-greater-element-i/
 * Tags: 栈  数组  哈希表  单调栈
 * Created: 2023-03-19 15:46:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 17:28:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 哈希法
 * @param nums1
 * @param nums2
 */
function nextGreaterElement1(nums1: number[], nums2: number[]): number[] {
  // Think for yourself for 5 minutes...
  // q1. 求nums1中的数字x 在nums2中的x的下一个更大的数 ，两个数组都不含重复数字
  // 将nums1的元素用hash表存起来，key对应数字 ，value对应下标
  // 递增栈[1,2,3]
  // 栈顶存放上一个较小的元素，当前元素大于栈顶元素时，就要将上一个(即栈顶元素)的"下一个更大的元素"更新为当前元素
  const hash: Map<number, number> = new Map()

  for (let i = 0; i < nums1.length; i++) {
    hash.set(nums1[i], i)
  }

  const stack: number[] = []

  stack.push(0)

  const result: number[] = Array(nums1.length).fill(-1)

  for (let i = 1; i < nums2.length; i++) {
    // console.log('stack', stack)
    let top = stack[stack.length - 1]
    while (stack.length > 0 && nums2[i] > nums2[top]) {
      let index = hash.get(nums2[top])
      if (index !== undefined) {
        // console.log('更新', i, nums2[i])
        result[index] = nums2[i]
      }
      stack.pop()
      top = stack[stack.length - 1]
    }
    if (hash.get(nums2[i]) !== undefined) {
      stack.push(i)
    }
  }
  // console.log('result', result)
  return result
}

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // const result: number[] = []

  const stack: number[] = Array(nums2.length).fill(0)

  const hash: Map<number, number> = new Map()

  for (let i = nums2.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1] <= nums2[i]) {
      stack.pop()
    }
    // result[i] = stack.length ? stack[stack.length - 1] : -1
    hash.set(nums2[i], stack.length ? stack[stack.length - 1] : -1)
    stack.push(nums2[i])
  }

  return Array.from({ length: nums1.length }, (_, k) => hash.get(nums1[k]) || -1)
}
export default nextGreaterElement
