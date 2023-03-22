/*
 * Description: 1319：独一无二的出现次数
 * Url: https://leetcode.cn/problems/unique-number-of-occurrences/
 * Tags: 数组  哈希表
 * Created: 2023-03-22 21:38:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:48:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function uniqueOccurrences1(arr: number[]): boolean {
  // Think for yourself for 5 minutes...

  const hash = {}

  for (const val of arr) {
    hash[val] = (hash[val] || 0) + 1
  }

  return Object.values(hash).length == [...new Set(Object.values(hash))].length
}

function uniqueOccurrences(arr: number[]): boolean {
  // -1000 <= arr[i] <= 1000
  const count = new Array(2002).fill(0) // -1000 <= arr[i] <= 1000

  for (const val of arr) {
    count[val + 1000]++ // 防止负数作为下标
  }

  const fre: boolean[] = []
  for (let i = 0; i <= 2000; i++) {
    if (count[i] > 0) {
      if (!fre[count[i]]) fre[count[i]] = true // 出现一次打上标记
      else return false // 说明重复出现了
    }
  }

  return true
}

export default uniqueOccurrences
