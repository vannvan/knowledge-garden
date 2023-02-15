/**
 * 冒泡排序
 */

const bubbleSort = (arr) => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 如果当前项大于下一项值
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1] // 下一项值缓存一个
        arr[j + 1] = arr[j] // 下一项值改为当前值
        arr[j] = tmp // 当前值改为下一项值
      }
    }
  }
  return arr
}

const nums = [5, 7, 0, 1, 2, 3, 9, 8, 6]

const res = bubbleSort(nums)

console.log('排序后', res)
