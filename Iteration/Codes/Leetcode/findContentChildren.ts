/*
 * Description: 455：分发饼干
 * Url: https://leetcode.cn/problems/assign-cookies/
 * Tags: 贪心  数组  双指针  排序
 * Created: 2023-03-10 16:15:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-29 22:25:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对，这样只能匹配胃口和饼干尺寸一致的
function findContentChildren1(g: number[], s: number[]): number {
  // Think for yourself for 5 minutes...
  let count: number = 0

  const childrenMap = new Map()

  // 记录每个对应胃口的孩子的数量
  for (let i = 0; i < g.length; i++) {
    let a = childrenMap.get(g[i]) || 0
    childrenMap.set(g[i], a + 1)
  }

  for (let k = 0; k < s.length; k++) {
    // 如果有对应胃口的孩子 X不对
    if (childrenMap.has(s[k])) {
      const a = childrenMap.get(s[k])
      if (a > 0) {
        console.log(s[k], a)
        childrenMap.set(s[k], a - 1)
        count++
      }
    }
  }

  console.log('count', count)

  return count
}

/**
 * 先满足大胃口的思路
 * @param g
 * @param s
 * @returns
 */
function findContentChildren(g: number[], s: number[]): number {
  //
  let count: number = 0

  let _g = g.sort((a, b) => a - b)
  let _s = s.sort((a, b) => a - b)

  let maxIndex = _s.length - 1

  for (let i = _g.length - 1; i >= 0; i--) {
    if (maxIndex >= 0 && _s[maxIndex] >= _g[i]) {
      count++
      maxIndex--
    }
  }

  return count
}

/**
 * 先满足小胃口
 * @param g
 * @param s
 * @returns
 */
function findContentChildren2(g: number[], s: number[]): number {
  s.sort((a, b) => a - b)
  g.sort((a, b) => a - b)

  let child = 0
  let cookie = 0
  while (child < g.length && cookie < s.length) {
    // 当用当前饼干可以满足当前孩子的需求，可以满足的孩子数量+1
    if (g[child] <= s[cookie]) {
      child++
    }
    cookie++
  }

  return child
}

export default findContentChildren
