/*
 * Description: 49：字母异位词分组
 * Url: https://leetcode.cn/problems/group-anagrams/
 * Tags: 数组  哈希表  字符串  排序
 * Created: 2023-04-10 21:49:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 22:11:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function groupAnagrams1(strs: string[]): string[][] {
  // Think for yourself for 5 minutes...
  // q1. 将单词字符相同出现次数相同的字符放进同一个组
  // q2. 将每个单词按照charCodeAt位置内部排序存到hash表里

  const hash: {
    [index: string]: number[]
  } = {}

  const sort = (str: string) => {
    const arr = str.split('')
    arr.sort((a, b) => String(a).charCodeAt(0) - String(b).charCodeAt(0))
    return arr.join('')
  }

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i]
    let s = sort(str)
    hash[s] = (hash[s] || []).concat(i)
  }

  const ans = []
  for (const key in hash) {
    const strsIndex = hash[key]
    let tmp = []
    strsIndex.map((index) => {
      tmp.push(strs[index])
    })
    ans.push(tmp)
  }

  return ans
}

function groupAnagrams(strs: string[]): string[][] {
  const hash: {
    [index: string]: string[]
  } = {}

  const sort = (str: string) => {
    const arr = str.split('')
    arr.sort((a, b) => String(a).charCodeAt(0) - String(b).charCodeAt(0))
    return arr.join('')
  }

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i]
    let s = sort(str)
    hash[s] = (hash[s] || []).concat(strs[i])
  }

  return Object.values(hash)
}
export default groupAnagrams
