/*
 * Description: 978：有效的山脉数组
 * Url: https://leetcode.cn/problems/valid-mountain-array/
 * Tags: 数组
 * Created: 2023-03-22 21:18:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-22 21:37:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function validMountainArray1(arr: number[]): boolean {
  // Think for yourself for 5 minutes...
  if (arr.length < 3) return false
  // q1. 有升有降，山谷
  const n: number = arr.length
  // 这种 逻辑 可能会漏掉 [2,0,2] 这样的数组
  let p: number = -1
  for (let i = 0; i < n; i++) {
    if (arr[i] < arr[i + 1]) {
      p = i + 1
    }

    while (p < n && p > -1) {
      if (arr[p] <= arr[p + 1]) {
        return false
      }
      p++
    }
  }
  console.log('p', p)
  return p > -1
}

function validMountainArray(arr: number[]): boolean {
  let p: number = 0
  const n: number = arr.length

  while (p + 1 < n && arr[p] < arr[p + 1]) p++ // 找到第一个最高点位置

  // 如果p在开头或结尾，说明整个数组是单调 递增或递减的
  if (p === 0 || p == n - 1) return false

  // 从p+1位置递减扫描
  while (p + 1 < n && arr[p] > arr[p + 1]) p++

  // 如果能扫到结尾，说明满足条件
  return p === n - 1
}
export default validMountainArray
