/*
 * Description: 768：划分字母区间
 * Url: https://leetcode.cn/problems/partition-labels/
 * Tags: 贪心  哈希表  双指针  字符串
 * Created: 2023-03-11 19:10:17
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 19:40:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function partitionLabels(s: string): number[] {
  // Think for yourself for 5 minutes...

  const hash = {} // 记录每个字符最后出现的位置
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = i
  }

  const result: number[] = []
  let nextStartIndex = 0 // 下一次切分的起始点
  let curPoint = 0 // 切分点
  for (let i = 0; i < s.length; i++) {
    curPoint = Math.max(curPoint, hash[s[i]])
    // curPoint === i 就是当i到了最后出现位置的时候
    if (curPoint === i) {
      result.push(curPoint - nextStartIndex + 1)
      nextStartIndex = i + 1
    }
  }
  console.log('result', result)

  return result
}
export default partitionLabels
