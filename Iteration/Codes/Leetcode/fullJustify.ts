/*
 * Description: 68：文本左右对齐
 * Url: https://leetcode.cn/problems/text-justification/
 * Tags: 数组  字符串  模拟
 * Created: 2023-04-20 23:20:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-20 23:51:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function fullJustify(words: string[], maxWidth: number): string[] {
  // Think for yourself for 5 minutes...
  // q1. 使用贪心算法
  // q2. 尽可能多的往每一行放置单词
  // q3. 如果某一行单词间隔不能均匀分配，左侧空格要多于右侧
  // q4. 要使每一串包含空格的长度等于maxWidth
  // q5. 最后一行左对齐
  // ----
  // 在没凑够maxWidth数量的字符之前，能用尽量用，当尝试使用i+1位置的单词将超过maxWidth就存一行

  // 制造空格
  const space = (n: number) => {
    return new Array(n).fill(' ').join('')
  }

  const n = words.length
  const ans = []

  let right = 0
  while (true) {
    const left = right // 当前这一行单词在words中的位置
    let sumLen = 0 // 统计当前行已凑的字符数
    // 已凑的字符没有超出maxWidth之前right一直往前进
    while (right < n && sumLen + words[right].length + right - left <= maxWidth) {
      sumLen += words[right].length
      right++
    }

    // 1. 当前行是最后一行
    if (right === n) {
      const s = words.slice(left).join(' ')
      ans.push(s + space(maxWidth - s.length))
      break
    }

    const numWords = right - left // 当前行的单词数
    const numSpaces = maxWidth - sumLen // 当前行需要的空格数

    // 2. 如果只有一个单词，那么左对齐，在后面填充空格
    if (numWords === 1) {
      ans.push(words[left] + space(numSpaces))
      continue
    }

    // 3. 当前行有多个单词的情况
    const avgSpaces = Math.floor(numSpaces / (numWords - 1)) // 平均每个单词之间需要的空格
    const extraSpaces = numSpaces % (numWords - 1) // 剩余的空格
    // 前半部分
    const s1 = words.slice(left, left + extraSpaces + 1).join(space(avgSpaces + 1)) // 拼接额外加一个空格的单词
    const s2 = words.slice(left + extraSpaces + 1, right).join(space(avgSpaces)) // 拼接其余单词
    ans.push(s1 + space(avgSpaces) + s2)
  }

  return ans
}
export default fullJustify
