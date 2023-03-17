/*
 * Description: 121：买卖股票的最佳时机
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/
 * Created: 2023-03-17 22:52:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-17 22:53:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfitBydp from '../maxProfitBydp'
describe('买卖股票的最佳时机 测试', () => {
  it('maxProfitBydp function', () => {
    expect(maxProfitBydp([7, 1, 5, 3, 6, 4])).toEqual(5)
    expect(maxProfitBydp([7, 6, 4, 3, 1])).toEqual(0)
  })
})
