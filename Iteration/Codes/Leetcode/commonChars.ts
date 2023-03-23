/*
 * Description: 1044：查找共用字符
 * Url: https://leetcode.cn/problems/find-common-characters/
 * Tags: 数组  哈希表  字符串
 * Created: 2023-03-23 21:52:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 22:42:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function commonChars(words: string[]): string[] {
  //q1. 以第一个字符串为基准 记录其每个字符出现的次数
  //q2. 再统计其他字符出现的次数  在这过程中取 出现次数的最小值
  //q3. 最后将字母表中出现次数大于0的字符输出
  const res: string[] = []
  const size = 26
  let firstHash = new Array(size)
  for (let i = 0; i < size; i++) {
    // 初始化 hash 数组
    firstHash[i] = 0
  }

  let a = 'a'.charCodeAt(0)
  let firstWord = words[0]
  for (let i = 0; i < firstWord.length; i++) {
    // 第 0 个单词的统计
    let idx = firstWord[i].charCodeAt(0)
    firstHash[idx - a] += 1
  }

  for (let i = 1; i < words.length; i++) {
    // 1-n 个单词统计
    let otherHash = new Array(size)
    for (let i = 0; i < size; i++) {
      // 初始化 hash 数组
      otherHash[i] = 0
    }

    for (let j = 0; j < words[i].length; j++) {
      let idx = words[i][j].charCodeAt(0)
      otherHash[idx - a] += 1
    }
    for (let i = 0; i < size; i++) {
      firstHash[i] = Math.min(firstHash[i], otherHash[i])
    }
  }

  //
  for (let i = 0; i < size; i++) {
    while (firstHash[i] > 0) {
      res.push(String.fromCharCode(i + a))
      firstHash[i]--
    }
  }
  return res
}

function commonChars1(words: string[]): string[] {
  const hash = {}

  const ans: string[] = []

  for (let i = 0; i < words.length; i++) {
    hash[i] = {}

    for (const s of words[i]) {
      hash[i][s] = (hash[i][s] || 0) + 1
    }
  }

  const has = {}

  let base = hash[0]
  for (let i = 1; i < words.length - 1; i++) {
    // if(hash)
    // base = hash[i]
    for (let j = 0; j < words[i].length; j++) {
      const char = words[i][j]
      if (base[char] && hash[i][char]) {
        has[char] = (has[char] || 0) + 1
      }
    }
  }

  console.log('has', has)
  return ans
}
export default commonChars
