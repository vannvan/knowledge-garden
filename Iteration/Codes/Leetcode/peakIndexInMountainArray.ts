/*
 * Description: 882：山脉数组的峰顶索引
 * Url: https://leetcode.cn/problems/peak-index-in-a-mountain-array/
 * Tags: 数组  二分查找
 * Created: 2023-05-12 23:27:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-12 23:45:09
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function peakIndexInMountainArray(arr: number[]): number {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      return i
    }
  }
}

function peakIndexInMountainArray1(arr: number[]): number {
  let left = 1
  let right = arr.length - 1

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2) + 1
    if (arr[mid - 1] < arr[mid]) {
      left = mid // [mid,right]
    } else {
      right = mid - 1 // [left,mid - 1]
    }
  }
  return left
}

// let mid = 0
// while (left < right) {
//   mid = left + Math.floor((right - left) / 2)
//   // mid -1 < mid > mid + 1 说明mid就是山峰
//   if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
//     return mid
//   }
//   // 如果左边更大，峰值在左边
//   if (arr[mid - 1] > arr[mid]) {
//     right = mid
//   } else {
//     left = mid
//   }
// }
// return mid
export { peakIndexInMountainArray, peakIndexInMountainArray1 }
