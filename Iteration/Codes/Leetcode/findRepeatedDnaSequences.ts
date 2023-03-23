/*
 * Description: 187：重复的DNA序列
 * Url: https://leetcode.cn/problems/repeated-dna-sequences/
 * Tags: 位运算  哈希表  字符串  滑动窗口  哈希函数  滚动哈希
 * Created: 2023-03-23 23:34:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 00:09:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 审错题
function findRepeatedDnaSequences1(s: string): string[] {
  // Think for yourself for 5 minutes...
  // q1. 不止一次的长度为10的子字符串
  // q2. 长度为10

  const ans: string[] = []

  // const hash: Map<string, number> = new Map()
  // for (const s1 of s) {
  //   hash.set(s1, (hash.get(s1) || 0) + 1)
  // }
  // //

  let left = 0
  let right = 0

  const need: Map<string, number> = new Map()
  while (right < s.length) {
    const cur = s[right]
    // if (!need.has(cur) && need.size <= 2) {
    //   need.set(cur, 1)
    // } else {
    //   need.set(cur, (need.get(cur) as number) + 1)
    // }
    // if (need.size <= 2) {
    need.set(cur, (need.get(cur) || 0) + 1)
    // }

    right++
    // console.log('need', need)
    if ([...need.values()].reduce((prev, curr) => prev + curr) === 10) {
      need.forEach((val, key) => {
        // console.log('key', key, val)
        // hash[key] -= val
        // hash.set(key, (hash.get(key) || 0) - val)
      })
      // console.log('剩余', hash)
      ans.push(s.substring(left, left + 10))
      left = right
      need.clear()
    }
  }
  console.log('ans', ans)
  return ans
}

function findRepeatedDnaSequences(s: string): string[] {
  const L = 10
  const ans: string[] = []
  const hash = new Map()
  const n = s.length

  for (let i = 0; i <= n - L; i++) {
    // 记录以i开头i+L结尾的字符串出现的次数，当>=2说明出现不止一次，
    // 但为了不记录重复数据，只在===2时存储一次
    const sub = s.slice(i, i + L)
    hash.set(sub, (hash.get(sub) || 0) + 1)
    if (hash.get(sub) === 2) {
      ans.push(sub)
    }
  }

  return ans
}

export default findRepeatedDnaSequences
