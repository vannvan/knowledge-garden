/*
 * Description: 子集 II
 * Url: https://leetcode.cn/problems/subsets-ii/
 * Tags: 位运算  数组  回溯
 * Created: 2023-03-06 22:23:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 22:44:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function subsetsWithDup(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  const backTrack = (nums: number[], startIndex: number) => {
    res.push([...track])

    for (let i = startIndex; i < nums.length; i++) {
      // 以 1 2 2 为例
      // 当遇到以startIndex为2，且后面还有数(i > startIndex ),同时当前项num[i]与前一项nums[i-1]相等
      // 那么之前已经存过相应的子集了，需要跳出循环
      // console.log('i', i, 'startInex', startIndex)
      if (i > startIndex && nums[i] == nums[i - 1]) continue
      track.push(nums[i])
      backTrack(nums, i + 1)
      track.pop()
    }
  }

  backTrack(nums.sort(), 0)

  console.log('res', res)
  return res
}
export default subsetsWithDup
