/*
 * Description: 309：最佳买卖股票时机含冷冻期
 * Url: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * Created: 2023-03-18 15:09:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 15:09:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProfitWithcooldown from '../maxProfitWithcooldown'
describe('最佳买卖股票时机含冷冻期 测试', () => {
  it('maxProfitWithcooldown function', () => {
    expect(maxProfitWithcooldown([1, 2, 3, 0, 2])).toEqual(3)
    expect(maxProfitWithcooldown([1])).toEqual(0)
  })
})
