/*
 * Description: 5：最长回文子串
 * Url: https://leetcode.cn/problems/longest-palindromic-substring/
 * Tags: 字符串  动态规划
 * Created: 2023-03-28 22:19:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-28 23:16:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 *  中心扩散法
 * @param s
 */
function longestPalindrome1(s: string): string {
  // Think for yourself for 5 minutes...
  if (!s) return ''

  let left = 0
  let right = 0
  let len = 1 // 计数
  let maxStart = 0
  let maxLen = 0
  const n = s.length

  for (let i = 0; i < n; i++) {
    left = i - 1
    right = i + 1
    //向左扩散
    while (left >= 0 && s.charAt(left) === s.charAt(i)) {
      left-- // 还能继续往左
      len++
    }

    // 向右扩散
    while (right >= 0 && right < n && s.charAt(right) === s.charAt(i)) {
      right++ // 还能继续往右
      len++
    }

    // 向两边扩散
    while (left >= 0 && right < n && s.charAt(left) === s.charAt(right)) {
      len += 2
      left--
      right++
    }

    if (len > maxLen) {
      maxLen = len
      maxStart = left
    }
    // 每定位完一个位置重置一下计数
    len = 1
  }

  return s.substring(maxStart + 1, maxStart + maxLen + 1)
}

/**
 * 动态规划法1
 * @param s
 */
function longestPalindrome2(s: string): string {
  if (!s) return ''

  // q1. dp[l][r]的含义是 字符串l->r是否为回文
  // q2. 当dp[l][r]是回文，那么需要知道dp[l-1][r+1]的位置(l和r向两端延伸)是不是回文

  const n = s.length
  let maxStart = 0
  let maxEnd = 0
  let maxLen = 1

  const dp = Array.from(Array(n), () => Array(n).fill(false)) // 二维

  for (let r = 1; r < n; r++) {
    for (let l = 0; l < r; l++) {
      if (s.charAt(l) === s.charAt(r) && (r - l <= 2 || dp[l + 1][r - 1])) {
        dp[l][r] = true
        if (r - l + 1 > maxLen) {
          maxLen = r - l + 1
          maxStart = l
          maxEnd = r
        }
      }
    }
  }

  return s.substring(maxStart, maxEnd + 1)
}

/**
 * 动态规划法2
 * @param s
 */
function longestPalindrome(s: string): string {
  // q1. dp[i][j]表示i->j是否能构成回文
  // q2. 因为dp[i][j]依赖于i+1位置和j-1位置的状态值，因此考虑从下往上，从左往右遍历
  const n = s.length
  let maxStart = 0
  let maxLen = 0
  const dp = new Array(n).fill(false).map(() => new Array(n).fill(false))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      // 当a或aa的时候 j - i <= 1
      // j-i==0 a
      // j-i==1 aa
      // 当s[i] === s[j]时，往中间收缩如果也想等那么i->j能构成回文
      if (s[i] === s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true
      }
      // 只要 dp[i][j] == true 成立，就表示子串 s[i..j] 是回文，此时记录回文长度和起始位置
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1 // 回文串长度
        maxStart = i // 起始位置
      }
    }
  }

  return s.substr(maxStart, maxLen)
}

export default longestPalindrome
