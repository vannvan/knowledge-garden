/*
 * Description: 1369：交换字符使得字符串相同
 * Url: https://leetcode.cn/problems/minimum-swaps-to-make-strings-equal/
 * Tags: 贪心  数学  字符串
 * Created: 2023-03-12 20:48:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 21:07:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minimumSwap(s1: string, s2: string): number {
  // Think for yourself for 5 minutes...
  if (s1.length != s2.length) return -1
  // 两种情况
  // s1[i] = x, s2[i] = y  记做xy
  // s1[i] = y, s2[i] = x  记做yx
  const n: number = s1.length

  let xy: number = 0
  let yx: number = 0

  for (let i = 0; i < n; i++) {
    const a = s1[i]
    const b = s2[i]
    if (a === 'x' && b === 'y') {
      xy++
    }
    if (a === 'y' && b === 'x') {
      yx++
    }
  }

  // 如果为奇数，肯定无法完成交换
  if ((xy + yx) % 2 === 1) {
    return -1
  }
  // xy / 2 和 yx / 2 表示内部配对，每两个配成一对交换一次
  // 如果两个都是偶数对，xy % 2 + yx % 2 = 0 + 0 = 0
  // 如果两个都是奇数对，xy % 2 + yx % 2 = 1 + 1 = 2，刚好表示各剩一个需要交换两次
  return Math.floor(xy / 2) + Math.floor(yx / 2) + (xy % 2) + (yx % 2)
}
export default minimumSwap
