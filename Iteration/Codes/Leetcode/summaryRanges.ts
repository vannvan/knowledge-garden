/*
 * Description: 228：汇总区间
 * Url: https://leetcode.cn/problems/summary-ranges/
 * Tags: 数组
 * Created: 2023-04-28 22:35:51
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-28 23:18:53
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function summaryRanges(nums: number[]): string[] {
  // Think for yourself for 5 minutes...
  // q1. 如果当前项和前一项相差大于1 那么前一项就需要归为一个区间了
  // q2. 如果当前项和前一项相邻，那么需要给下一次迭代更新右边界

  if (nums.length === 0) return []

  let startVal = nums[0]
  let endVal = nums[0]

  const ans = []

  for (let i = 1; i < nums.length; i++) {
    //如果当前项和前一项连续，startVal不更新,endVal更新为当前数
    if (nums[i] - nums[i - 1] === 1) {
      endVal = nums[i]
    } else {
      // console.log('结尾', endVal, '当前数', nums[i], 'startVal', startVal)
      // 如果当前endVal == startVal,说明当前数前一位只有它自己可以作为区间
      ans.push(`${startVal === endVal ? startVal : startVal + '->' + endVal}`)
      startVal = nums[i]
      endVal = nums[i]
    }
  }

  // 最后，如果startVal和endVal相等，那么说明最后剩下的区间就是最后一个数，否则就是最后两个数
  ans.push(`${startVal === endVal ? startVal : startVal + '->' + endVal}`)

  return ans
}

export default summaryRanges
