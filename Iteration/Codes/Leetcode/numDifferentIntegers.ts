/*
 * Description: 1933：字符串中不同整数的数目
 * Url: https://leetcode.cn/problems/number-of-different-integers-in-a-string/
 * Tags: 哈希表  字符串
 * Created: 2023-04-14 21:36:49
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 21:37:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function numDifferentIntegers(word: string): number {
  const words = word.split(/[a-z]+/g)
  const set = new Set()
  for (const item of words) {
    if (item.length !== 0) {
      let i = 0
      while (item.charAt(i) === '0' && i < item.length - 1) {
        i++
      }
      set.add(item.substring(i))
    }
  }

  return set.size
}
export default numDifferentIntegers
