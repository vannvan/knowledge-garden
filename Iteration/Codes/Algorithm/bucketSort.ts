/*
 * Description: 桶排序
 * Created: 2023-02-21 18:06:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 21:22:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import mergeSort from './mergeSort2'

const bucketSort = (nums: number[], bucketSize = 5) => {
  if (nums.length < 2) return nums
  let buckets = createBucket(nums, bucketSize)
  return sortBucket(buckets)
}

const createBucket = (nums: number[], bucketSize: number) => {
  const maxValue = Math.max(...nums)
  const minVallue = Math.min(...nums)

  const bucketCount = Math.ceil((maxValue - minVallue) / bucketSize) // 每个桶中的数量
  let buckets: number[][] = []
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [] // 将每个桶初始化
  }

  for (let i = 0; i < nums.length; i++) {
    const bucketIndex = Math.floor((nums[i] - minVallue) / bucketSize) // 看需要把元素放在哪个桶中
    buckets[bucketIndex] = buckets[bucketIndex]
      ? buckets[bucketIndex].concat(nums[i])
      : ([] as number[]).concat(nums[i])
  }

  return buckets
}

const sortBucket = (buckets: number[][]) => {
  let res = []
  for (let i = 0; i < buckets.length; i++) {
    res = res.concat(mergeSort(buckets[i]))
  }
  return res
}

export default bucketSort
