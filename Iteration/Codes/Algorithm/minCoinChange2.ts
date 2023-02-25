/*
 * Description: 贪心算法 硬币找零
 * Created: 2023-02-25 20:47:41
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-25 20:52:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 *
 * @param coins 硬币数组
 * @param amount 金额
 */
const minCoinChange2 = (coins: number[], amount: number) => {
  const change: number[] = []
  let total = 0
  for (let i = coins.length; i >= 0; i--) {
    const coin = coins[i]
    while (total + coin <= amount) {
      change.push(coin)
      total += coin
    }
  }
  return change
}

export default minCoinChange2
