/*
 * Description: 买卖股票的最佳时机
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * Created: 2023-02-28 22:26:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-10 22:04:54
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

const maxProfit = (prices: number[]): number => {
  // 此方案超出限制
  // let max = 0
  // let n: number = prices.length
  // for (let i = 0; i < n; i++) {
  //   for (let k = i + 1; k < n; k++) {
  //     let inc = prices[k] - prices[i]
  //     if (inc > 0 && inc > max) {
  //       max = inc
  //     }
  //   }
  // }
  // return max
  let minprice = Number.MAX_SAFE_INTEGER;
  let maxprofit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minprice) {
      minprice = prices[i]; // 假设这一天就是最低值
    } else if (prices[i] - minprice > maxprofit) {
      maxprofit = prices[i] - minprice;
    }
  }

  return maxprofit;
};

export default maxProfit;
