/*
 * Description: 165：比较版本号
 * Url: https://leetcode.cn/problems/compare-version-numbers/
 * Tags: 双指针  字符串
 * Created: 2023-03-17 16:14:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 16:55:57
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function compareVersion(version1: string, version2: string): number {
  // Think for yourself for 5 minutes...
  // q1.如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
  // q2. 只需要比较同一位置上的 忽略任何前导零后的整数值
  // q3. 以点为界限 依次比较每一位去除前导零后的整数值大小
  // q4. 当下一位不存在时 按照0去和另外一位对比

  const n1: number = version1.split('.').length
  const n2: number = version2.split('.').length

  const n: number = n1 > n2 ? n1 - 1 : n2 - 1

  let l: number = 0

  while (l <= n) {
    console.log('l', l, n)
    let str1 = version1.split('.')[l] || '0'
    let str2 = version2.split('.')[l] || '0'
    console.log('str1', str1, 'str2', str2)
    if (parseInt(str1) > parseInt(str2)) {
      return 1
    } else if (parseInt(str1) < parseInt(str2)) {
      return -1
    } else if (l < n) {
      console.log('往后移')
      l++
    } else {
      console.log('相等了')
      return 0
    }
  }

  // 如果指针走到头还没有在上面return 那一定是相等的
  return 0
}
export default compareVersion
