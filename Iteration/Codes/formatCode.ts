/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-20 22:51:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
function spiralOrder(matrix: number[][]): number[] {
  const ans: number[] = []
  if (!matrix.length) return ans //若数组为空，直接返回答案
  let t = 0 //赋值上下左右边界
  let b = matrix.length - 1
  let l = 0
  let r = matrix[0].length - 1
  while (true) {
    //
    for (let i = l; i <= r; ++i) ans.push(matrix[t][i]) //向右移动直到最右
    if (++t > b) break //重新设定上边界，若上边界大于下边界，则遍历遍历完成，下同
    for (let i = t; i <= b; ++i) ans.push(matrix[i][r]) //向下
    if (--r < l) break //重新设定有边界
    for (let i = r; i >= l; --i) ans.push(matrix[b][i]) //向左
    if (--b < t) break //重新设定下边界
    for (let i = b; i >= t; --i) ans.push(matrix[i][l]) //向上
    if (++l > r) break //重新设定左边界
  }
  return ans
}
