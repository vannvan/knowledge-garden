/*
 * Description: 2366：装满石头的背包的最大数量
 * Url: https://leetcode.cn/problems/maximum-bags-with-full-capacity-of-rocks/
 * Tags: 贪心  数组  排序
 * Created: 2023-03-15 19:25:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 19:44:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 *
 * @param capacity 背包容量数组
 * @param rocks 已经装进去的数
 * @param additionalRocks 额外装进去的数量
 * return 最大数量
 */
function maximumBags(capacity: number[], rocks: number[], additionalRocks: number): number {
  // Think for yourself for 5 minutes...
  // q1. 返回装满的背包的最大数量，就是尽量要让最多的背包装满
  // q2. 不必用完所有石头
  // q3. 将背包按照最接近满的排个序,先把最接近满的装满
  //

  let count: number = 0

  // capacity.sort((a,b) => capacity[a])
  const residue: number[] = []

  for (let i = 0; i < capacity.length; i++) {
    residue.push(capacity[i] - rocks[i])
  }

  residue.sort((a, b) => a - b)

  for (const val of residue) {
    if (val > 0 && additionalRocks - val >= 0) {
      additionalRocks -= val
      count++
    }
    if (val == 0) {
      count++
    }
  }

  console.log('count', count)

  return count
}
export default maximumBags
