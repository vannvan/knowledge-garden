/*
 * undefined: 顺时针螺旋顺序输出
 * Created: 2023-02-27 19:28:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 20:29:09
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// const spiralOrder = (matrix: number[][]): number[] => {
//   let ans: number[] = []
//   let start = matrix[0][0] // 从第一个数开始
//   let count = matrix.flat().length
//   let left = -1 // 左
//   let right = matrix[0].length - 1 // 右
//   let down = matrix.length - 1 // 下
//   let top = 0 // 上
//   let num = 0
//   // console.log('r', r, 'b', b)
//   while (start <= count) {
//     if (++left > right) break
//     for (let i = left; i <= right; ++i) ans[num++] = matrix[top][i]
//     if (++top > down) break
//     for (let i = top; i <= down; ++i) ans[num++] = matrix[i][right]
//     if (--right < left) break
//     for (let i = right; i >= left; --i) ans[num++] = matrix[down][i]
//     if (--down < top) break
//     for (let i = down; i >= top; --i) ans[num++] = matrix[i][left]
//   }
//   return ans
// }

const spiralOrder = (matrix: number[][]): number[] => {
  let res: number[] = []
  let start = matrix[0][0] // 从第一个数开始
  let count = matrix.flat().length
  let l = 0 // 左
  let r = matrix[0].length - 1 // 右
  let b = matrix.length - 1 // 下
  let t = 0 // 上
  while (start <= count) {
    if (l > r) break
    for (let i = l; i <= r; i++, count--) res.push(matrix[t][i]) // 左到右
    t++
    if (t > b) break
    for (let i = t; i <= b; i++, count--) res.push(matrix[i][r]) // 上到下
    r--
    if (r < l) break
    for (let i = r; i >= l; i--, count--) res.push(matrix[b][i]) // 右到左
    b--
    if (b < t) break
    for (let i = b; i >= t; i--, count--) res.push(matrix[i][l]) // 下到上
    l++
  }
  return res
}

export default spiralOrder
