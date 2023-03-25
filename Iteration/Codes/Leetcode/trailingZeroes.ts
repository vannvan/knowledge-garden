/*
 * Description: 172：阶乘后的零
 * Url: https://leetcode.cn/problems/factorial-trailing-zeroes/
 * Tags: 数学
 * Created: 2023-03-25 16:14:30
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 16:17:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function trailingZeroes(n: number): number {
  // Think for yourself for 5 minutes...
  let ans: number = 0

  let divisor: number = 5
  while (divisor <= n) {
    ans += Math.floor(n / divisor)

    divisor *= 5
  }

  return ans
}
export default trailingZeroes
