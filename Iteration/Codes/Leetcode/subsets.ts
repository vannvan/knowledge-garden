/*
 * Description: 子集
 * Url: https://leetcode.cn/problems/subsets/
 * Tags: 位运算  数组  回溯
 * Created: 2023-03-06 20:32:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-18 23:46:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function subsets(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const stack: number[] = []

  const backTrack = (startIndex: number, path: string) => {
    res.push([...stack])
    path += '_'
    for (let i = startIndex; i < nums.length; i++) {
      stack.push(nums[i])
      backTrack(i + 1, path + '_')
      stack.pop()
    }
  }

  backTrack(0, '_')
  return res
}
export default subsets
