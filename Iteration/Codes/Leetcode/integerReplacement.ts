/*
 * Description: 397：整数替换
 * Url: https://leetcode.cn/problems/integer-replacement/
 * Tags: 贪心  位运算  记忆化搜索  动态规划
 * Created: 2023-03-11 22:32:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 22:54:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const map = {}

/**
 * 记忆法
 * @param n
 * @returns
 */
function integerReplacement1(n: number): number {
  // Think for yourself for 5 minutes...
  if (n == 1) return 0

  const value = map[n]
  if (value) {
    return value
  }

  let result = 0

  if (n % 2 === 0) {
    result = 1 + integerReplacement(n / 2)
  } else {
    result = 1 + Math.min(integerReplacement(n + 1), integerReplacement(n - 1))
  }
  map[n] = result

  return result
}

/**
 * 贪心
 * @param n
 */
function integerReplacement(n: number): number {
  let count = 0
  while (n != 1) {
    if (n & 1) {
      if (n === 3) {
        n = n - 1
      } else {
        if (n & 2) {
          n = n + 1
        } else {
          n = n - 1
        }
      }
    } else {
      n = n >>> 1
    }
    count++
  }

  return count
}

export default integerReplacement
