/*
 * Description: 940：水果成篮
 * Url: https://leetcode.cn/problems/fruit-into-baskets/
 * Tags: 数组  哈希表  滑动窗口
 * Created: 2023-04-15 16:57:55
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 17:10:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function totalFruit(fruits: number[]): number {
  // Think for yourself for 5 minutes...
  let count = 0
  let map = new Map()
  let left = 0
  const n = fruits.length
  for (let i = 0; i < n; i++) {
    // 摘下当前位置的水果
    map.set(fruits[i], (map.get(fruits[i]) || 0) + 1)
    // 已经装的类型超过2种，缩小窗口
    while (map.size > 2) {
      map.set(fruits[left], map.get(fruits[left]) - 1)
      if (map.get(fruits[left]) === 0) {
        map.delete(fruits[left])
      }
      left++
    }

    count = Math.max(count, i - left + 1)
  }

  return count
}
export default totalFruit
