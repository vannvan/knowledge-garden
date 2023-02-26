/*
 * undefined: 最小覆盖字符串
 * https://leetcode.cn/problems/minimum-window-substring/
 * Created: 2023-02-26 18:01:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 19:52:23
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const minWindow = (s: string, t: string): string => {
  let left = 0
  const need = new Map()
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1) // 初始化need为t中字符的个数
  }

  // 关键在于need和needCount之间的配合,
  let needCount = need.size
  let res = ''
  for (let right = 0; right < s.length; right++) {
    const current = s[right]
    // 如果need中有当前右指针的字符，need中当前右指针字符对应的value - 1
    if (need.has(current)) {
      need.set(current, need.get(current) - 1)
      //  如果当前右指针字符对应的value === 0 needCount -= 1
      if (need.get(current) === 0) needCount -= 1
    }
    // 当needType === 0时候说明已经找到符合要求的子串开始处理左指针,可能后面还有，继续往右移动
    while (needCount === 0) {
      const newRes = s.substring(left, right + 1)
      if (!res || newRes.length < res.length) res = newRes

      const c2 = s[left]
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1)
        if (need.get(c2) === 1) needCount += 1
      }
      left++
    }
  }

  console.log('need', Object.fromEntries(need.entries()), 'needCount', needCount)
  return res
}

export default minWindow
