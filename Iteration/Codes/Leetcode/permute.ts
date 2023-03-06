/*
 * Description: 全排列
 * Url: https://leetcode.cn/problems/permutations/
 * Tags: 数组  回溯
 * Created: 2023-03-06 20:46:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-06 22:17:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function permute(nums: number[]): number[][] {
  // Think for yourself for 5 minutes...
  const res: number[][] = []

  const track: number[] = []

  const used: boolean[] = new Array(nums.length).fill(false)

  const backTrack = (nums: number[]) => {
    // 满足条件添加到结果集
    console.log('track', track)

    if (track.length === nums.length) {
      res.push([...track])
    }

    for (let i = 0; i < nums.length; i++) {
      // 如果track中已经选择过，就要跳过
      console.log(`此时${nums[i]}在used中的位置${i},${used[i] ? '不放' : '放进去'}`, 'used', used)
      if (used[i]) continue
      // 或者，但是会影响复杂度
      // if(track.includes(nums[i])) continue
      track.push(nums[i])
      backTrack(nums)
      track.pop()
      used[i] = false
    }
  }

  backTrack(nums)

  console.log('res', res)

  return res
}
export default permute
