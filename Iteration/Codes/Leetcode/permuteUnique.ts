/*
 * Description: 全排列 II
 * Url: https://leetcode.cn/problems/permutations-ii/
 * Tags: 数组  回溯
 * Created: 2023-03-06 23:01:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 17:57:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function permuteUnique(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...

  const res: number[][] = []

  const track: number[] = []

  const used: boolean[] = []

  const backTrack = (nums: number[]) => {
    if (track.length === nums.length) {
      res.push([...track])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      // !used[i - 1] 和 used[i - 1] 都能获取到结果，但是used[i - 1]会经过多余的路径
      if (nums[i] == nums[i - 1] && !used[i - 1]) continue

      used[i] = true
      track.push(nums[i])
      backTrack(nums)
      used[i] = false
      track.pop()
    }
  }

  backTrack(nums.sort())

  console.log('res', res)
  return res
}
export default permuteUnique
