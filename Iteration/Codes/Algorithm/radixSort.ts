/*
 * Description:
 * Created: 2023-02-21 21:21:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-21 22:20:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * eg [1,71,231,681,658,892]
 * @param nums
 * @returns
 */
const radixSort = (nums: number[]) => {
  // 定义一个二维数组，表示10个桶，每个桶就是一个一维数组
  let buckets = new Array(10)
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = new Array(nums.length)
  }
  // 为了记录每个桶中，实际存了多少个数据，我们定义一个维数组来记录每个桶的每次放入的数据个数
  const buckeElementCounts = new Array(10).fill(0) // 0-9

  // 得到数组中最大的数
  let max = nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
    }
  }
  // 以最大数的基数为限
  const maxLen = (max + '').length

  // 因为基于基数排序的，每一轮增加一个基数，所以基数在最外层
  for (let i = 0, n = 1; i < maxLen; i++, n = n * 10) {
    // 第一轮，对每个元素的个位数进行排序,依次以十位、百位、千位...进行排序
    for (let j = 0; j < nums.length; j++) {
      // 取出个位数的值
      let digitOfElement = Math.floor(nums[j] / n) % 10 // 0-9
      buckets[digitOfElement][buckeElementCounts[digitOfElement]] = nums[j]
      buckeElementCounts[digitOfElement]++ // 这里处理完是可能有空桶的
    }

    // 第一轮  [1, 101, 672, 302, 782, 444, 989]
    // 第二轮  [1, 101, 302, 444, 672, 782, 989]
    // 第三轮  [1, 101, 302, 444, 672, 782, 989]

    // console.log('buckeElementCounts', buckeElementCounts)

    // 按照这个桶的顺序，依次对每个桶进行处理,10个桶，一个一个往后找
    let index = 0
    for (let k = 0; k < buckeElementCounts.length; k++) {
      //如果桶中有数据，我们才放入原数组
      if (buckeElementCounts[k] !== 0) {
        //循环该桶即第k个桶，即第k个一维数组，放入
        for (let l = 0; l < buckeElementCounts[k]; l++) {
          //取出元素放入arr
          nums[index] = buckets[k][l]
          //arr下标后移
          index++
        }
        //每轮处理后，下标要清0
        buckeElementCounts[k] = 0
      }
    }
    // console.log('nums', nums)
  }
  return nums
}

export default radixSort
