/*
 * Description: 最小矩阵链计算次数
 * 描述了4个矩阵：
 * A(10,100)
 * B(100,20)
 * C(20,50)
 * D(50,1)
 * const p = [10, 100, 20, 50, 1]
 * Created: 2023-02-25 13:48:44
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 14:57:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 矩阵链
 * @param p
 * @returns
 */
const minMatrixChainMultiTimes = (p: number[]): number => {
  const { length } = p
  // 最优次数二维矩阵
  const m: number[][] = []

  const s: number[][] = []

  // 对角线填充为0
  for (let i = 1; i <= length; i++) {
    m[i] = []
    m[i][i] = 0
  }

  for (let i = 0; i <= length; i++) {
    s[i] = []
    for (let j = 0; j <= length; j++) {
      s[i][j] = 0
    }
  }

  for (let x = 2; x <= length; x++) {
    // 从dp[1][2] 开始算,因为只用算对角线右上方的，因此length - x + 1
    for (let i = 1; i <= length - x + 1; i++) {
      const j = i + x - 1
      m[i][j] = Number.MAX_SAFE_INTEGER
      for (let k = 0; k <= j - 1; k++) {
        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        // console.log('i,j', i, j)
        if (q < m[i][j]) {
          m[i][j] = q
          s[i][j] = k
        }
      }
    }
  }
  const bestMethod = getBestMethod(s, 1, length - 1, '')
  console.log('bestMethod', bestMethod)
  return m[1][length - 1]
}

/**
 * 最佳矩阵相乘组合方式
 * @param s 完整矩阵
 * @param i
 * @param j
 * @param str
 * @returns
 */
const getBestMethod = (s: number[][], i: number, j: number, str: string) => {
  if (i == j) {
    // console.log(`[A${i}]`)
    str += `[A${i}]`
  } else {
    // console.log('(')
    let a = '(' + getBestMethod(s, i, s[i][j], str)
    let b = getBestMethod(s, s[i][j] + 1, j, str) + ')'
    // console.log(')')
    str = str + a + b
  }
  return str
}

export default minMatrixChainMultiTimes
