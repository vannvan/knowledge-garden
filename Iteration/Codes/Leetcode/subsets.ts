/*
 * Description: 子集
 * Url: https://leetcode.cn/problems/subsets/
 * Tags: 位运算  数组  回溯
 * Created: 2023-03-06 20:32:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 20:38:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function subsets(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = [[]]

  const stack: number[] = []

  const backTrack = (startIndex: number) => {
    if (stack.length) {
      res.push([...stack])
    }

    for (let i = startIndex; i < nums.length; i++) {
      stack.push(nums[i])
      backTrack(i + 1)
      stack.pop()
    }
  }

  backTrack(0)
  return res
}
export default subsets
