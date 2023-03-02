/*
 * Description: 反转字符串 II
 * Url: https://leetcode.cn/problems/reverse-string-ii/
 * Created: 2023-03-02 22:38:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 00:12:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function reverseStr(s: string, k: number): string {
  let strArr = Array.from(s)

  const reverse = (left, right) => {
    while (left < right) {
      const temp = strArr[left]
      strArr[left] = strArr[right]
      strArr[right] = temp
      left++
      right--
    }
  }

  let n = strArr.length
  // 版本1 反转每个下标从2k的倍数开始的，长度为k的子串，若该子串不足k，则反转整个子串
  // for (let i = 0; i < n; i += 2 * k) {
  //   if (i + k < n) {
  //     console.log('i+k', i + k)
  //     reverse(i, i + k - 1)
  //   } else {
  //     reverse(i, n - 1)
  //   }

  //   // reverse(i, Math.min(i + k, n) - 1)
  // }

  // 版本2
  // for (let i = 0; i < n; i += 2 * k) {
  //   // 每隔 2k 个字符的前 k 个字符进行反转
  //   let l = i - 1,
  //     r = i + k > n ? n : i + k
  //   while (++l < --r) {
  //     ;[strArr[l], strArr[r]] = [strArr[r], strArr[l]]
  //   }
  // }

  // 版本3 更好理解的
  for (let i = 0; i < n; ) {
    //如果剩下的长度大于2倍K，说明需要反转前k个字符（包括当前字符）
    if (n - i >= 2 * k) {
      reverse(i, i + k - 1)
      i += 2 * k
      continue
    }
    // 如果剩下的字符小于k个，则把剩下的全部反转（包括当前字符）
    if (n - i < k) {
      reverse(i, n - 1)
      break
    }
    if (n - i < 2 * k && n - i > k) {
      //否则就是剩下的字符长度大于等于k，却小于2倍k的，需要反转前k个字符,其余字符不变
      reverse(i, i + k - 1)
      break
    }
  }
  console.log('strArr', strArr)

  return strArr.join('')
}
export default reverseStr
