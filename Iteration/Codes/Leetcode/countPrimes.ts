/*
 * Description: 204：计数质数
 * Url: https://leetcode.cn/problems/count-primes/
 * Tags: 数组  数学  枚举  数论
 * Created: 2023-03-25 16:49:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 16:59:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function countPrimes(n: number): number {
  // Think for yourself for 5 minutes...
  // q1.小于n的质数

  let ans: number = 0

  const isPrime = new Array(n).fill(true)

  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      ans += 1
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false
      }
    }
  }
  return ans
}
export default countPrimes
