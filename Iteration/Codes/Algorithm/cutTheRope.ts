/*
 * Description: 动态规划切绳子
 * 有一根长度为n的绳子，把绳子剪成m段(m、n都是整数，n > 1并且m > 1)，每段绳子的长度记为k[0], k[1], ..., k[m]。
 * 请问k[m] * k[1] * ... * k[m]可能的最大乘积是多少?
 * 例如：当绳子长度为8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。
 * 推导结果 result[n] = result[i] * result[n - i]  i为绳子当前要且的位置
 * Created: 2023-02-23 21:11:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-23 21:30:04
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const cutTheRope = (length: number) => {
  // 不能切
  if (length < 2) {
    return 0
  }
  // 只能从中间切
  if (length == 2) {
    return 1
  }
  // 只能切为 1 1 1 或 1 2 所以最大为2
  if (length === 3) {
    return 2
  }

  const dp = new Array(length + 1)
  dp[0] = 0
  dp[1] = 1
  // 绳子长度为2或3时，不进行拆分，最大乘积为绳子的长度
  dp[2] = 2
  dp[3] = 3

  for (let i = 4; i <= length; i++) {
    dp[i] = 0
    let max = 0
    // 至少切一刀，所以从1开始，切过中间值以后，与中间值以前的计算结果一样，所以只用算出前面部分的结果，因此 j<=i/2
    for (let j = 1; j <= i / 2; j++) {
      const result = dp[j] * dp[i - j]
      if (max < result) {
        max = result
      }
      dp[i] = max
    }
  }

  console.log('dp', dp)
  return dp[length]
}

export default cutTheRope
