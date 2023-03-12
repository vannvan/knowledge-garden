/*
 * Description: 680：验证回文串 II
 * Url: https://leetcode.cn/problems/valid-palindrome-ii/
 * Tags: 贪心  双指针  字符串
 * Created: 2023-03-12 16:08:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 16:28:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// 不对
function validPalindrome1(s: string): boolean {
  // Think for yourself for 5 minutes...

  let left: number = 0
  let right: number = s.length - 1

  let p: number = 1
  let last: string[] = []
  while (left <= right) {
    if (s[left] != s[right]) {
      last = [s[left], s[right]]
      p--
    }
    if (last.length && (!last.includes(s[left]) || !last.includes(s[right]))) {
      p--
    }

    left++
    right--
  }
  console.log('p', p)
  return p >= 0
}

function isPalindrome(s: string, left: number, right: number) {
  for (let i = left, j = right; i <= j; i++, j--) {
    if (s[i] !== s[j]) {
      return false
    }
  }
  return true
}

function validPalindrome(s: string): boolean {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) {
      //  左边往右挪一步或右边往左挪一步的区间是否满足回文条件
      return isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1)
    }
  }
  return true
}

export default validPalindrome
