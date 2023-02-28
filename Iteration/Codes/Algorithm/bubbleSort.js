/*
 * Description: 冒泡排序
 * Created: 2023-02-20 09:07:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 09:08:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 冒泡排序
 */

const bubbleSort = (arr) => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 如果当前项大于下一项值
      if (arr[j] > arr[j + 1]) {
        // let tmp = arr[j + 1] // 下一项值缓存一个
        // arr[j + 1] = arr[j] // 下一项值改为当前值
        // arr[j] = tmp // 当前值改为下一项值
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

const nums = [5, 7, 0, 1, 2, 3, 9, 8, 6]

const res = bubbleSort(nums)

console.log('排序后', res)
