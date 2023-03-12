/*
 * Description: 876：一手顺子
 * Url: https://leetcode.cn/problems/hand-of-straights/
 * Tags: 贪心  数组  哈希表  排序
 * Created: 2023-03-12 17:52:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 18:35:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isNStraightHand(hand: number[], groupSize: number): boolean {
  // Think for yourself for 5 minutes...
  // q1. 用hash表记录每张牌出现的次数，用一次就减1
  // q2. 能构成一手顺子的条件一定是 n%groupSize==0 ,否则就false

  const n: number = hand.length

  if (n % groupSize != 0) return false

  const hash = new Map()

  for (let i = 0; i < hand.length; i++) {
    let a = hash.get(hand[i]) || 0
    hash.set(hand[i], a + 1)
  }

  hand.sort((a, b) => a - b)

  for (let i = 0; i < hand.length; i++) {
    if (hash.get(hand[i]) == 0) continue // 如果没有这张牌了就跳过
    let p: number = hand[i]

    let next: number = 1 // 比当前大一位的

    // 执行到这里说明当前位用了一次
    hash.set(p, hash.get(p) - 1)

    while (next < groupSize) {
      // 取数
      let a = hash.get(p + next)
      if (a) {
        // 取到了相邻的下一位
        hash.set(p + next, a - 1)
        next++
      } else {
        console.log('没取到')
        return false
      }
    }
  }

  // console.dir(hash)

  return true
}
export default isNStraightHand
