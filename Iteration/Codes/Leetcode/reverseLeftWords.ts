/*
 * Description: 左旋转字符串
 * Url: https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
 * Tags: 数学  双指针  字符串
 * Created: 2023-03-03 11:59:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 18:53:09
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverseLeftWords(s: string, n: number): string {
  let strArr = Array.from(s)

  const reverse = (left: number, right: number) => {
    while (left < right) {
      let tmp = strArr[right]
      strArr[right] = strArr[left]
      strArr[left] = tmp
      left++
      right--
    }
  }

  for (let i = 0; i <= strArr.length - 1; i++) {
    // 先翻转 0-n 区间的字符串
    if (i == n) {
      reverse(0, n - 1)
    }
    // 再翻转 n-结尾的字符串
    if (i == n) {
      reverse(n, strArr.length - 1)
    }
    // 最后反转整个字符串
    if (i == strArr.length - 1) {
      reverse(0, strArr.length - 1)
    }
  }

  console.log('strArr', strArr)

  return strArr.join('')
}
export default reverseLeftWords
