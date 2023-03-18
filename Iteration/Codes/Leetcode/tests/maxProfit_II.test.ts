/*
 * Description: 123：买卖股票的最佳时机 III
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii
 * Created: 2023-03-18 14:14:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:15:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfit from '../maxProfit_II'
describe('买卖股票的最佳时机 III 测试', () => {
  it('maxProfit function', () => {
    expect(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])).toEqual(6)
    expect(maxProfit([1, 2, 3, 4, 5])).toEqual(4)
    expect(maxProfit([7, 6, 4, 3, 1])).toEqual(0)
  })
})
