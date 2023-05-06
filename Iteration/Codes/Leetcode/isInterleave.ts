/*
 * Description: 97：交错字符串
 * Url: https://leetcode.cn/problems/interleaving-string/
 * Tags: 字符串  动态规划
 * Created: 2023-05-06 23:01:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-07 00:22:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function isInterleave(s1: string, s2: string, s3: string): boolean {
  // Think for yourself for 5 minutes...
  // q1. s3 由 s1和s2交错组成
  // q2. 如果s1.length + s2.length !== s3.length 直接返回false
  // q3. 交错，既可以是s1的字符先开头，也可以是s2的字符先开头,后面也可以调换顺序,总之在s1中用了几个字符，同样下标的s2也要用几个字符
  // q4. 也就是说 s1 的i/[i,i+n]位置，和s2的 j/[j+n] 能否构成 s3的 i+j/[i+n,j+n]
  // q5. dp[i][j] 表示 s1的前i个字符和s2的前j个字符是否能构成s3的前i+j个字符
  // q5. 考虑如果将s1按行排列，s2按列排开，那么对于第1行来说，就是不取s2中的字符，就是用每个下标的字符依次对比s3同下标的字符，s2的操作同理
  // 初始化[0][0]下标是空字符串，认为其为true

  const m = s1.length
  const n = s2.length
  const t = s3.length
  if (m + n !== t) return false
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(false))
  dp[0][0] = true

  for (let i = 1; i <= m; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1]
  }

  for (let j = 1; j <= n; j++) {
    dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1]
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let p = i + j - 1
      dp[i][j] = (dp[i - 1][j] && s3[p] == s1[i - 1]) || (dp[i][j - 1] && s3[p] === s2[j - 1])
    }
  }

  return dp[m][n]
}
export default isInterleave
