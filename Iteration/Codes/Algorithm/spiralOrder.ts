/*
 * undefined: 顺时针螺旋顺序输出
 * Created: 2023-02-27 19:28:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 21:44:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 这个方法有遗漏
 * @param matrix
 * @returns
 */
const spiralOrder1 = (matrix: number[][]): number[] => {
  let ans: number[] = []
  let start = matrix[0][0] // 从第一个数开始
  let count = matrix.flat().length
  let left = -1 // 左
  let right = matrix[0].length - 1 // 右
  let down = matrix.length - 1 // 下
  let top = 0 // 上
  let num = 0
  // console.log('r', r, 'b', b)
  while (start <= count) {
    if (++left > right) break
    for (let i = left; i <= right; ++i) ans[num++] = matrix[top][i]
    if (++top > down) break
    for (let i = top; i <= down; ++i) ans[num++] = matrix[i][right]
    if (--right < left) break
    for (let i = right; i >= left; --i) ans[num++] = matrix[down][i]
    if (--down < top) break
    for (let i = down; i >= top; --i) ans[num++] = matrix[i][left]
  }
  console.log('ans', ans)
  return ans
}
/**
 *
 * @param matrix
 * @returns
 */
const spiralOrder = (matrix: number[][]): number[] => {
  let res: number[] = []
  // let start = matrix[0][0] // 从第一个数开始
  // let count = matrix.flat().length
  let l = -1 // 左
  let t = 0 // 上
  let b = matrix.length - 1 // 下
  let r = matrix[0].length - 1 // 右

  console.log(t, r, b, l)

  while (t <= b && l <= r) {
    if (++l > r) break
    for (let i = l; i <= r; i++) res.push(matrix[t][i]) // 左到右
    if (++t > b) break
    for (let i = t; i <= b; i++) res.push(matrix[i][r]) // 上到下
    if (--r < l) break
    for (let i = r; i >= l; i--) res.push(matrix[b][i]) // 右到左
    if (--b < t) break
    for (let i = b; i >= t; i--) res.push(matrix[i][l]) // 下到上
  }

  console.log('res', res)
  return res
}

export default spiralOrder
