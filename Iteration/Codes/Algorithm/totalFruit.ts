/*
 * Description: 水果成篮
 * https://leetcode.cn/problems/fruit-into-baskets/
 * Created: 2023-02-26 17:27:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-26 20:21:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const totalFruit = (fruits: number[]): number => {
  let res = 0
  let map = new Map()
  let startIndex = 0
  for (let right = 0; right < fruits.length; ++right) {
    map.set(fruits[right], (map.get(fruits[right]) || 0) + 1)
    //如果哈希表大小 大于2，那就移动startIndex将fruits[startIndex]从哈希表中移除，直到满足要求为止
    while (map.size > 2) {
      map.set(fruits[startIndex], map.get(fruits[startIndex]) - 1)
      if (map.get(fruits[startIndex]) == 0) {
        map.delete(fruits[startIndex])
      }
      startIndex++
    }
    res = Math.max(res, right - startIndex + 1)
  }
  return res
}

export default totalFruit
