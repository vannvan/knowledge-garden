/*
 * Description: 50：Pow(x, n)
 * Url: https://leetcode.cn/problems/powx-n/
 * Tags: 递归  数学
 * Created: 2023-04-25 23:37:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 23:40:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function myPow(x: number, n: number): number {
  // Think for yourself for 5 minutes...
  if (n == 0 || n == 1) {
    return n == 0 ? 1 : x
  } else if (n < 0) {
    return myPow(1 / x, Math.abs(n))
  } else {
    return n % 2 == 0 ? myPow(x * x, n / 2) : myPow(x * x, Math.floor(n / 2)) * x
  }
}
export default myPow
