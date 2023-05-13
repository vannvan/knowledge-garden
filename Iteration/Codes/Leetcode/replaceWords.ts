/*
 * Description: 648：单词替换
 * Url: https://leetcode.cn/problems/replace-words/
 * Tags: 字典树  数组  哈希表  字符串
 * Created: 2023-05-13 23:31:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-13 23:38:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function replaceWords(dictionary: string[], sentence: string): string {
  // Think for yourself for 5 minutes..
  let words = sentence.split(' ')

  const dictSet = new Set()
  for (const val of dictionary) {
    dictSet.add(val)
  }

  for (const [i, word] of words.entries()) {
    let p = 0
    while (p < word.length && !dictSet.has(word.substring(0, p))) {
      p++
    }
    words[i] = word.substring(0, p)
  }

  return words.join(' ')
}
export default replaceWords
