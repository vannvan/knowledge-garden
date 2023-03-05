/*
 * Description: Excel 表列序号
 * Url: https://leetcode.cn/problems/excel-sheet-column-number/
 * Tags: 数学  字符串
 * Created: 2023-03-05 19:58:05
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 20:15:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function titleToNumber(columnTitle: string): number {
  let number = 0
  let mul = 1
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    // k是该字母在1-26中的位置
    let k: number = columnTitle[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1
    number += k * mul
    mul *= 26
  }

  return number
}
export default titleToNumber
