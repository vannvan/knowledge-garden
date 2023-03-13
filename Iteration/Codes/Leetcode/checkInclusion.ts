/*
 * Description: 567：字符串的排列
 * Url: https://leetcode.cn/problems/permutation-in-string/
 * Tags: 哈希表  双指针  字符串  滑动窗口
 * Created: 2023-03-13 22:37:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 23:02:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function checkInclusion(s1: string, s2: string): boolean {
  // Think for yourself for 5 minutes...

  const need: Map<string, number> = new Map()

  const window: Map<string, number> = new Map()

  for (const t of s1) {
    const a = need.get(t) || 0
    need.set(t, a + 1)
  }

  let left = 0
  let right = 0
  let count: number = 0
  while (right < s2.length) {
    const c = s2[right]
    right++
    // 说明s2中找到了s1的字符
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1)
      if (window.get(c) === need.get(c)) {
        count++
      }
    }

    // 判断左侧窗口是否需要收缩,right - left 在剩余窗口足够的情况下
    while (right - left >= s1.length) {
      // 说明找到了完整的s1字符串
      if (count === need.size) {
        return true
      }

      const c2 = s2[left]
      // 当上面没成立，左侧窗口就需要收缩了
      left++
      if (need.has(c2)) {
        if (window.get(c2) === need.get(c2)) {
          count--
        }
        window.set(c2, (window.get(c2) || 0) - 1)
      }
    }
  }
  return false
}
export default checkInclusion
