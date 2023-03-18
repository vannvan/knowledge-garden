/*
 * Description: 188：买卖股票的最佳时机 IV
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/
 * Created: 2023-03-18 14:32:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 14:33:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfitIv from '../maxProfitIv'
describe('买卖股票的最佳时机 IV 测试', () => {
  it('maxProfitIv function', () => {
    expect(maxProfitIv(2, [2, 4, 1])).toEqual(2)
    expect(maxProfitIv(2, [3, 2, 6, 5, 0, 3])).toEqual(7)
  })
})
