/*
 * Description: 191：位1的个数
 * Url: https://leetcode.cn/problems/number-of-1-bits/
 * Tags: 位运算  分治
 * Created: 2023-03-24 23:16:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 23:35:55
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function hammingWeight(n: number): number {
  // Think for yourself for 5 minutes...
  let res = 0
  while (n != 0) {
    n = n & (n - 1)
    res++
  }
  return res
}
export default hammingWeight
