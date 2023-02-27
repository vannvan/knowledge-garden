/*
 * undefined: 螺旋矩阵
 * Created: 2023-02-27 18:44:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-27 19:25:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 生成螺旋矩阵
 * eg: n=3
 * @param n
 */
const generateMatrix = (n: number): number[][] => {
  let res: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))
  let l = 0 // 左
  let r = n - 1 // 右
  let t = 0 // 上
  let b = n - 1 // 下
  let num = 1
  const limit = n * n
  while (num <= limit) {
    for (let i = l; i <= r; i++) res[t][i] = num++ // 从左到右，最后上边界下移 t++
    t++
    for (let i = t; i <= b; i++) res[i][r] = num++ // 从上到下，最后右边界左移 r--
    r--
    for (let i = r; i >= l; i--) res[b][i] = num++ // 从右到左，最后下边界上移 b--
    b--
    for (let i = b; i >= t; i--) res[i][l] = num++ // 从下到上，最后左边界右移，l++
    l++
  }
  return res
}

export default generateMatrix
