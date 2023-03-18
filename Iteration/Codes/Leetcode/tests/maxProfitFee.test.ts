/*
 * Description: 714：买卖股票的最佳时机含手续费
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * Created: 2023-03-18 14:56:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:56:44
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfitFee from '../maxProfitFee'
describe('买卖股票的最佳时机含手续费 测试', () => {
  it('maxProfitFee function', () => {
    expect(maxProfitFee([1, 3, 2, 8, 4, 9], 2)).toEqual(8)
    expect(maxProfitFee([1, 3, 7, 5, 10, 3], 3)).toEqual(6)
  })
})
