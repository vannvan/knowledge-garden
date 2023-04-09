/*
 * Description: 139：单词拆分
 * Url: https://leetcode.cn/problems/word-break/
 * Tags: 字典树  记忆化搜索  数组  哈希表  字符串  动态规划
 * Created: 2023-04-09 20:40:59
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 21:11:41
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function wordBreak(s: string, wordDict: string[]): boolean {
  // Think for yourself for 5 minutes...
  // q1. 不要求所有单词都使用
  // q2. 可以重复使用
  // q3. dict的子结构不能改变
  // q4. 可以拆分为s中的每一个子串是否存在在dict中
  // dp[i] 表示s的前i个字符组成的字符串s[0,i-1]是否能够被空格拆分成若干个字典中的出现的单词
  const n: number = s.length
  const wordDictSet: Set<string> = new Set(wordDict)
  const dp: Array<boolean> = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}
export default wordBreak
