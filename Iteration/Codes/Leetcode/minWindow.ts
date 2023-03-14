/*
 * Description: 76：最小覆盖子串
 * Url: https://leetcode.cn/problems/minimum-window-substring/
 * Tags: 哈希表  字符串  滑动窗口
 * Created: 2023-03-14 18:59:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 19:37:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minWindow(s: string, t: string): string {
  // Think for yourself for 5 minutes...

  const need: Map<string, number> = new Map()

  const window: Map<string, number> = new Map()

  for (const c of t) {
    const a = need.get(c) || 0
    need.set(c, a + 1)
  }

  const n: number = s.length

  let count: number = 0

  let left: number = 0
  let right: number = 0

  // 记录最小覆盖子串的起始索引及长度
  let start = 0
  let len = Infinity

  let res: string = ''

  while (right < n) {
    const si = s[right]
    right++
    if (need.has(si)) {
      if (window.has(si)) {
        window.set(si, (window.get(si) || 0) + 1)
      } else {
        window.set(si, 1)
      }

      if (need.get(si) === window.get(si)) {
        count++
      }
    }
    // 判断左侧窗口是否要收缩
    while (count === need.size) {
      // 在这里更新最小覆盖子串
      if (right - left < len) {
        const a = s.substring(left, right + 1) // 新匹配的位置
        res = a.length < res.length ? a : res
        // console.log('更新位置', left, right, s.substring(left, right + 1))

        start = left
        len = right - left
      }

      // d 是将移出窗口的字符
      const s2 = s[left]
      // 缩小窗口
      left++
      // 进行窗口内数据的一系列更新
      if (need.has(s2)) {
        if (window.get(s2) === need.get(s2)) {
          count--
        }
        window.set(s2, (window.get(s2) || 0) - 1)
      }
    }
  }

  return len === Infinity ? '' : s.substring(start, start + len)
}
export default minWindow
