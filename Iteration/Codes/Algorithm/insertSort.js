/*
 * Description: 插入排序
 * Created: 2023-02-20 09:07:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 09:07:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 插入排序
 */

const insertSort = (arr) => {
  const len = arr.length
  //此处i = 1，从第二个元素开始匹配，默认第一个元素已经排序，此处跟下面while循环的 j>=0 保留一个就行，另一个没有意义
  for (var i = 1; i < len; i++) {
    var current = arr[i] //记录当前需要插入排序的元素，避免下面while循环被覆盖
    // 以arr[i]为分界线，前面的是已经排序的，后面是未排序的
    var j = i - 1 //最开始while循环之前 j 是默认已排序的元素中的 最后一个的索引，此处每次for循环会重新定义j
    while (j >= 0 && arr[j] > current) {
      //在已排序好的队列中从后向前匹配
      arr[j + 1] = arr[j] //已排序的元素大于新元素，将该元素移到一下个位置
      j--
    }
    // 直到while循环不满足条件才会执行
    arr[j + 1] = current
  }
  return arr
}

const nums = [5, 7, 0, 1, 2, 3, 9, 8, 6]

const res = insertSort(nums)

console.log('排序后', res)
