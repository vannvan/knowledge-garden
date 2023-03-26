/*
 * Description: 89：格雷编码
 * Url: https://leetcode.cn/problems/gray-code/
 * Tags: 位运算  数学  回溯
 * Created: 2023-03-26 19:44:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 19:45:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function grayCode(n: number): number[] {
  // Think for yourself for 5 minutes...
  const ret = []
  for (let i = 0; i < 1 << n; i++) {
    ret.push((i >> 1) ^ i)
  }
  return ret
}
export default grayCode
