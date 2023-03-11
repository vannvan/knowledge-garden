/*
 * Description: 890：柠檬水找零
 * Url: https://leetcode.cn/problems/lemonade-change/
 * Tags: 贪心  数组
 * Created: 2023-03-11 16:18:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 16:43:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function lemonadeChange(bills: number[]): boolean {
  // Think for yourself for 5 minutes...

  let five = 0
  let ten = 0

  for (let i = 0; i < bills.length; i++) {
    if (bills[i] === 5) five++
    // 需要找钱的情况

    if (bills[i] == 10) {
      if (five == 0) return false
      five--
      ten++
    }

    if (bills[i] === 20) {
      if (five > 0 && ten > 0) {
        ten--
        five--
        // twenty++
      } else if (five >= 3) {
        // 没有10元的情况
        five -= 3
      } else {
        return false
      }
    }
  }
  return true
}
export default lemonadeChange
