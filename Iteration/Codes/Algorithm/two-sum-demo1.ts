/*
 * Description: 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值
 * target  的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 你可以按任意顺序返回答案。
 * Created: 2023-02-20 23:18:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-20 23:43:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const twoSum = (nums: number[], target: number) => {
  const { length } = nums
  for (let i = 0; i < length; i++) {
    // 以[0]为基准，依次往后找
    // 再以[1]为基准，依次往后找
    // 以此类推
    for (let j = 0; j < i; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j]
      }
    }
  }

  return [-1, -1]
}

const twoSumBetter = (nums: number[], target: number) => {
  const { length } = nums

  const map = new Map()

  for (let i = 0; i < length; i++) {
    if (map.get(target - nums[i])) {
      return [target - nums[i], i]
    }
    map.set(i, nums[i])
  }

  return [-1, 1]
}

export { twoSum, twoSumBetter }
