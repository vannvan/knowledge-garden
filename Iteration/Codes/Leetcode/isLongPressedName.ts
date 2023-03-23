/*
 * Description: 961：长按键入
 * Url: https://leetcode.cn/problems/long-pressed-name/
 * Tags: 双指针  字符串
 * Created: 2023-03-23 23:00:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-23 23:25:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isLongPressedName1(name: string, typed: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. 谁长谁短不确定，因此要处理name没处理完和typed没处理完的情况
  // q2. name没处理完肯定是false
  // q3. typed没处理完需要看后面的字符串是不是都是一样的，不一样就是false
  let slow = 0
  let fast = 0

  while (fast < typed.length && slow < name.length) {
    if (name[slow] === typed[fast]) {
      slow++
      fast++
    } else {
      if (fast === 0) return false
      // typed有重复项，往后移动
      while (fast < typed.length && typed[fast] === typed[fast - 1]) fast++
      if (name[slow] === typed[fast]) {
        slow++
        fast++
      } else {
        return false
      }
    }
  }

  // 说明name没有被匹配完,例如 name:"pyplrzzzzdsfa" type:"ppyypllr"
  if (slow < name.length) return false

  // 说明typed没有被匹配完,例如 name:"alex" type:"alexxrrrrssda"
  while (fast < typed.length) {
    if (typed[fast] === typed[fast - 1]) fast++
    else return false
  }

  return true
}

/**
 * 如果满足条件slow和fast都会走到头
 * @param name
 * @param typed
 * @returns
 */
function isLongPressedName(name: string, typed: string): boolean {
  let slow: number = 0
  let fast: number = 0

  while (slow < name.length && fast < typed.length) {
    if (name[slow] !== typed[fast]) return false
    slow++
    fast++

    // 当slow走到头，或者name的相邻两个字符不想等时(且name[slow]==typed[fast],因为上面不想等就false了)，typed继续向前进
    if (slow === name.length || name[slow] !== name[slow - 1]) {
      while (fast < typed.length && typed[fast] === typed[fast - 1]) fast++
    }
  }

  return slow === name.length && fast === typed.length
}

export default isLongPressedName
