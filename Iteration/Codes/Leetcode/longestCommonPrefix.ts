/*
 * Description: 最长公共前缀
 * Url: https://leetcode.cn/problems/longest-common-prefix/
 * Tags: 字典树  字符串
 * Created: 2023-03-05 16:24:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-05 16:37:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function longestCommonPrefix(strs: string[]): string {
  // 横向扫描
  if (!strs || strs.length == 0) return ''
  const getPrefix = (str1: string, str2: string) => {
    let len = Math.max(str1.length, str2.length) // 以较长的为准遍历
    let index = 0

    while (index < len && str1[index] === str2[index]) {
      index++
    }

    return str1.substring(0, index)
  }

  let n = strs.length
  let prefix = strs[0]
  for (let i = 0; i < n; i++) {
    prefix = getPrefix(prefix, strs[i])
    if (prefix.length == 0) break
  }

  return prefix
}
export default longestCommonPrefix
