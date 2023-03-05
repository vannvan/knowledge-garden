/*
 * Description: Excel表列名称
 * Url: https://leetcode.cn/problems/excel-sheet-column-title/
 * Tags: 数学  字符串
 * Created: 2023-03-05 18:29:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 21:44:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function convertToTitle1(columnNumber: number): string {
  let ans: string[] = []
  while (columnNumber > 0) {
    const a0 = ((columnNumber - 1) % 26) + 1
    console.log('a0', a0)
    ans.push(String.fromCharCode(a0 - 1 + 'A'.charCodeAt(0)))
    columnNumber = Math.floor((columnNumber - a0) / 26)
    console.log('columnNumber', columnNumber)
  }
  console.log('ans', ans)

  ans.reverse()
  return ans.join('')
}

function convertToTitle(columnNumber: number): string {
  let ans: string[] = []
  while (columnNumber >= 1) {
    columnNumber--
    ans.push(String.fromCharCode((columnNumber % 26) + 'A'.charCodeAt(0)))
    columnNumber /= 26
  }

  ans.reverse()
  return ans.join('')
}

export default convertToTitle
