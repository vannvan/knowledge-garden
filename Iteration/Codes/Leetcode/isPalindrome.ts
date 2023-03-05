/*
 * Description: 验证回文串
 * Url: https://leetcode.cn/problems/valid-palindrome/
 * Tags: 双指针  字符串
 * Created: 2023-03-05 16:39:28
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 17:51:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 这个版本超出限制
function isPalindrome1(s: string): boolean {
  // TODO

  // 去除空格，非字母字符
  const trim = (str: string) => {
    return str.replace(/\s+|\W|\_/g, '')
  }

  // 如果是空字符串
  if (trim(s).length === 0) return true

  const lowerCase = (str: string) => {
    return str.toLowerCase()
  }

  let strAfter = lowerCase(trim(s))

  let left = 0
  let right = strAfter.length - 1
  while (left < right) {
    // if (strAfter[left] != strAfter[right]) return false
    if (strAfter[left] === strAfter[right]) {
      strAfter = strAfter.substring(left + 1, right)
      console.log('前后相等', strAfter, left, right)
      // left = 0
      right = strAfter.length - 1
    } else if (strAfter[left] && strAfter[right] && strAfter[left] !== strAfter[right]) {
      console.log('left', strAfter[left], 'right', strAfter[right])
      return false
    } else {
      console.log('left', strAfter[left], 'right', strAfter[right])
      return true
    }
  }

  return strAfter.length < 2
}

function isPalindrome(s: string): boolean {
  const str = s.toLowerCase()
  let left = 0
  let right = str.length - 1

  const isValid = (str: string) => {
    return /[a-z\d]/.test(str)
  }

  while (left < right) {
    if (!isValid(str[left])) {
      left++
      continue // continue之后右指针不会移动，直接进入下次循环
    }

    if (!isValid(str[right])) {
      right--
      continue //  continue之后左指针不会移动，直接进入下次循环
    }

    // 如果遇到不匹配的在这里就可以终止了，不用再移动指针
    if (str[left] != str[right]) return false
    left++
    right--
  }

  return true
}

export default isPalindrome
