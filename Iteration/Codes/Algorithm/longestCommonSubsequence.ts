/*
 * Description: 最长公共子序列
 * Created: 2023-02-24 19:11:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-24 23:18:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 最长子序列长度
 * @param wordX 字符串x
 * @param wordY 字符串y
 * @returns number
 */
const longestCommonSubsequence = (wordX: string, wordY: string): number => {
  const m = wordX.length
  const n = wordY.length
  // 初始化dp矩阵
  const dp: number[][] = []
  for (let i = 0; i <= m; i++) {
    dp[i] = []
    for (let j = 0; j <= n; j++) {
      dp[i][j] = 0
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0
        // 当纵横位置字符相同的话，当前位置的值等于左上斜角的值+1
      } else if (wordX[i - 1] === wordY[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // 否则就比较正上方和正左侧的值，哪个大就取哪个
        const topValue = dp[i - 1][j]
        const leftValue = dp[i][j - 1]
        dp[i][j] = topValue > leftValue ? topValue : leftValue
      }
    }
  }
  return dp[m][n]
}

/**
 * 获取子序列值
 * @param solution 序列矩阵
 * @param wordX
 * @param m x 轴
 * @param n y 轴
 * @returns string
 */
const getSolution = (solution: string[][], wordX: string, m: number, n: number): string => {
  let xAxis = m // 横向
  let yAxis = n // 纵向
  let x = solution[yAxis][xAxis]
  let result = ''
  while (x !== '-') {
    if (solution[yAxis][xAxis] === 'diagonal') {
      result = wordX[yAxis - 1] + result
      yAxis--
      xAxis--
    } else if (solution[yAxis][xAxis] === 'left') {
      xAxis--
    } else if (solution[yAxis][xAxis] === 'top') {
      yAxis--
    }
    x = solution[yAxis][xAxis]
  }

  return result
}

/**
 * 最长子序列值
 * @param wordX 字符串x
 * @param wordY 字符串y
 * @returns string
 */
const longestCommonSubsequencePlan = (wordX: string, wordY: string): string => {
  const m = wordX.length
  const n = wordY.length
  // 初始化dp矩阵
  const dp: number[][] = []
  const solution: string[][] = []
  for (let i = 0; i <= m; i++) {
    dp[i] = []
    solution[i] = []
    for (let j = 0; j <= n; j++) {
      dp[i][j] = 0
      solution[i][j] = ''
    }
  }

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0
        solution[i][j] = '-'
        // 当纵横位置字符相同的话，当前位置的值等于左上斜角的值+1
      } else if (wordX[i - 1] === wordY[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        solution[i][j] = 'diagonal'
      } else {
        // 否则就比较正上方和正左侧的值，哪个大就取哪个
        const topValue = dp[i - 1][j]
        const leftValue = dp[i][j - 1]
        dp[i][j] = topValue > leftValue ? topValue : leftValue
        solution[i][j] = topValue > leftValue ? 'top' : 'left'
      }
    }
  }
  // 因为上面是 wordX作为外层for循环，因此wordX是在y轴
  console.log('solution', solution)
  return getSolution(solution, wordX, m, n)
}

export { longestCommonSubsequence, longestCommonSubsequencePlan }
