/*
 * Description: 加一
 * https://leetcode.cn/problems/plus-one/
 * Created: 2023-02-28 20:45:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-28 23:14:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const plusOne = (digits: number[]): number[] => {
  let { length } = digits

  let last = length - 1

  while (last >= 0) {
    if (digits[last] == 9) {
      // 向左移动，当前位值变成-
      digits[last] = 0
      last--
    }
    if (digits[last] < 9) {
      digits[last]++
      return digits
    }
  }

  // 只有全是9的情况会走到这里
  let a = new Array(digits.length + 1).fill(0)
  a[0] = 1
  return a
}

export default plusOne
