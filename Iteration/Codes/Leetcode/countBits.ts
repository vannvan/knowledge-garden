/*
 * Description: 338：比特位计数
 * Url: https://leetcode.cn/problems/counting-bits/
 * Tags: 位运算  动态规划
 * Created: 2023-04-11 22:40:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 22:50:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function countBits(n: number): number[] {
  // Think for yourself for 5 minutes...
  const ans = []
  ans[0] = 0

  for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
      ans[i] = ans[i / 2]
    } else {
      ans[i] = ans[i - 1] + 1
    }
  }

  return ans
}
export default countBits
