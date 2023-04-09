/*
 * Description: 152：乘积最大子数组
 * Url: https://leetcode.cn/problems/maximum-product-subarray/
 * Created: 2023-04-09 21:48:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 21:48:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxProduct from '../maxProduct'
describe('乘积最大子数组 测试', () => {
  it('maxProduct function', () => {
    expect(maxProduct([2, 3, -2, 4])).toEqual(6)
    expect(maxProduct([-2, 0, -1])).toEqual(0)
  })
})
