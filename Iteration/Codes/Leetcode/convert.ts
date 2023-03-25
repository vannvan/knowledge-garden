/*
 * Description: 6：N 字形变换
 * Url: https://leetcode.cn/problems/zigzag-conversion/
 * Tags: 字符串
 * Created: 2023-03-25 17:40:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 18:05:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function convert(s: string, numRows: number): string {
  // Think for yourself for 5 minutes...
  // q1. 一个完整的N字型需要 2*numRow-(numRows-2)个字母
  // q2. 构造过程：当向下时需要r个字符，再向上时需要r-2个字符，然后再回到第一行，因此N字型变换周期是t=2r-2
  // 每个周期会占用矩阵上的1+r-2=r-1列，因此有n/t个周期，矩阵的列数为r-1行
  // q3.

  const n = s.length
  const r = numRows
  if (r === 1 || r >= n) {
    return s
  }

  const t = r * 2 - 2

  const c = Math.floor((n + t - 1) / t) * (r - 1)

  const mat = new Array(r).fill(0).map(() => new Array(c).fill(0))

  for (let i = 0, x = 0, y = 0; i < n; ++i) {
    mat[x][y] = s[i]
    if (i % t < r - 1) {
      ++x // 向下移动
    } else {
      --x
      ++y // 向右上移动
    }
  }

  const ans: string[] = []
  for (const row of mat) {
    for (const ch of row) {
      if (ch !== 0) {
        ans.push(ch)
      }
    }
  }
  return ans.join('')
}
export default convert
