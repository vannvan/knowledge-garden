/*
 * Description: 122：买卖股票的最佳时机 II
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * Created: 2023-03-11 14:21:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 14:38:21
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfit from '../maxProfit_plus'
describe('买卖股票的最佳时机 II 测试', () => {
  it('maxProfit function', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(7)
    expect(maxProfit([1, 2, 3, 4, 5])).toEqual(4)
    expect(maxProfit([7, 6, 4, 3, 1])).toEqual(0)
  })
})
