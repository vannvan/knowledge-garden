/*
 * Description: 子集 II  Set方法去重的思路
 * Url: https://leetcode.cn/problems/subsets-ii/
 * Tags: 位运算  数组  回溯
 * Created: 2023-03-07 22:35:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:50:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function subsetsWithDupSet(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  const backTrack = (nums: number[], startIndex: number) => {
    res.push([...track])

    const usedSet = new Set()

    for (let i = startIndex; i < nums.length; i++) {
      // 可以去掉这一行对比实际的效果
      if (usedSet.has(nums[i])) continue

      usedSet.add(nums[i])
      track.push(nums[i])

      backTrack(nums, i + 1)

      track.pop()
    }
  }

  backTrack(nums, 0)

  return res
}
export default subsetsWithDupSet
