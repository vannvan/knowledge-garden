/*
 * Description: 122：买卖股票的最佳时机 II
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
 * Created: 2023-03-18 13:58:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 13:59:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfitIibydp from '../maxProfitIibydp'
describe('买卖股票的最佳时机 II 测试', () => {
  it('maxProfitIibydp function', () => {
    expect(maxProfitIibydp([7, 1, 5, 3, 6, 4])).toEqual(7)
    expect(maxProfitIibydp([1, 2, 3, 4, 5])).toEqual(4)
    expect(maxProfitIibydp([7, 6, 4, 3, 1])).toEqual(0)
  })
})
