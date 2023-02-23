/**
 * 快速排序
 */

/**
 *
 * @param {number[]} arr
 */
const quickSort = (arr) => {
  const len = arr.length
  if (len < 2) return arr

  const pointIndex = Math.floor(len / 2)

  let left = []
  let right = []

  for (let i = 0; i < len; i++) {
    if (i != pointIndex) {
      if (arr[i] <= arr[pointIndex]) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
  }

  console.log('left', left, 'right', right)
  return quickSort(left).concat(arr[pointIndex], quickSort(right))
}

const nums = [5, 7, 0, 1, 2, 3, 9, 8, 6]

const res = quickSort(nums)

console.log('res', res)