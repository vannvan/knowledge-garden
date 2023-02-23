/*
 * Description: 最少硬币找零
 * Created: 2023-02-22 20:10:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-23 09:15:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 返回零钱数组
 * 以 [1, 2, 5, 10, 20], 36 为例
 * 会对所有小于amount的金额计算minCoinChange的结果
 * @param coin 钱的面额数组
 * @param amount 需要找的钱
 */

const minCoinChange = (coins: number[], amount: number) => {
  const cache = {}
  const makeChange = (value: number) => {
    //
    if (!value) return []
    if (cache[value]) return cache[value]
    let lastMin: number[] = [] // 最终的最优解
    let preMin: number[] = [] // 既是小于当前面额的某个面额的最优解，也是后续value-coins[i]的最优解
    let newAmount: number
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i]
      newAmount = value - coin // 剩下的需要找的钱
      if (newAmount >= 0) {
        preMin = makeChange(newAmount) // 在coins没用完之前，对剩余的钱找最小的结果
      }
      // 当到36的时候，此时coins[i] 1元的时候 preMin 已经从 35元拿到了 [5,10,20] (preMin.length || !newAmount)成立,
      // 同时preMin.length=3 lastMin.length - 1=0不成立  !lastMin.length成立
      // newAmount 为35成立
      if (
        newAmount >= 0 &&
        (preMin.length < lastMin.length - 1 || !lastMin.length) &&
        (preMin.length || !newAmount)
      ) {
        // preMin的存在是用来存储每一轮使用coins[i]的时候，当前数额是否在 value-coins[i]的时候找到了最优解
        lastMin = [coin].concat(preMin)
        console.log('new min for', lastMin, value, 'preMin', preMin)
      }
    }
    cache[value] = lastMin
    return cache[value]
  }

  return makeChange(amount)
}

/**
 * 返回零钱个数
 * 以 [1, 2, 5, 10, 20], 36 为例
 * 金额 1 的最优解 是1 1
 * 金额 2 的最优解 是1 过程，找dp[2] 会经过两轮 A轮 dp[1]和dp[1-1]+1 取1 B轮dp[2]和dp[2-1] 取1
 * 金额 3 的最优解 是2 1+2 过程，找dp[3] 会用到1和2 dp[3-1]+1 前者小
 * 金额 4 的最优解 是2 2+2 过程，找dp[4] 会经过两轮 A dp[4]和dp[4-1]+1 取3 B dp[4]和dp[4-2]+1 取2
 * 整体的思路就是 假设在计算dp(需要找零的钱)之前，我们已经计算出dp(0) 到dp(需要找零的钱-1)的值。
 * @param coins
 * @param amount
 * @returns
 */
const minCoinChange2 = (coins: number[], amount: number) => {
  const max = amount + 1
  const dp = new Array(max).fill(max)
  dp[0] = 0 // 金额0的最优解为0
  // 从1开始，这里假设了所有1，2，3，4，5...的钱都有，第i块钱的时候，要去尝试每一个可用面值一次i-coin
  for (let i = 1; i <= amount; i++) {
    // 内层遍历就是整个零钱数组的过程，当前凑的钱数i都尝试一下所有可用的面值
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount]
}

export { minCoinChange, minCoinChange2 }
