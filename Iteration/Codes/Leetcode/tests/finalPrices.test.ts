/*
 * Description: 1570：商品折扣后的最终价格
 * Url: https://leetcode.cn/problems/final-prices-with-a-special-discount-in-a-shop/
 * Created: 2023-03-20 22:34:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 22:36:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import finalPrices from '../finalPrices'
describe('商品折扣后的最终价格 测试', () => {
  it('finalPrices function', () => {
    expect(finalPrices([8, 4, 6, 2, 3])).toEqual([4, 2, 4, 2, 3])
    expect(finalPrices([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
    expect(finalPrices([10, 1, 1, 6])).toEqual([9, 0, 1, 6])
  })
})
