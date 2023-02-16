/**
 * 选择排序
 */

const selectorSort = (arr) => {
  const len = arr.length
  let minIndex = null // 最小值的索引
  for (let i = 0; i < len - 1; i++) {
    // 先认为当前项是最小值
    minIndex = i
    // 从当前项的下一项开始比，所以从j初始值为 i+1
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // let tmp = arr[i]
    // arr[i] = arr[minIndex]
    // arr[minIndex] = tmp
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

    console.log('minIndex', minIndex)
  }
  return arr
}

const nums = [5, 7, 0, 1, 2, 3, 9, 8, 6]

const res = selectorSort(nums)

console.log('排序后', res)
