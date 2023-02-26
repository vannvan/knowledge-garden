/*
 * undefined: 最小覆盖字符串
 * https://leetcode.cn/problems/minimum-window-substring/
 * Created: 2023-02-26 18:01:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 19:08:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const minWindow = (s: string, t: string): string => {
  let l = 0
  let r = 0
  const need = new Map()
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1) // 初始化need为t中字符的个数
  }

  // 关键在于need和needCount之间的配合

  let needCount = need.size
  let res = ''
  while (r < s.length) {
    const current = s[r]
    // 如果need中有当前右指针的字符，need中当前右指针字符对应的value - 1
    if (need.has(current)) {
      need.set(current, need.get(current) - 1)
      //  如果当前右指针字符对应的value === 0 needCount -= 1
      if (need.get(current) === 0) needCount -= 1
    }
    // 当needType === 0时候说明已经找到符合要求的子串开始处理左指针,可能后面还有，继续往右移动
    while (needCount === 0) {
      const newRes = s.substring(l, r + 1)
      if (!res || newRes.length < res.length) res = newRes

      const c2 = s[l]
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1)
        if (need.get(c2) === 1) needCount += 1
      }
      l += 1
    }
    r += 1
  }
  return res
}

export default minWindow
