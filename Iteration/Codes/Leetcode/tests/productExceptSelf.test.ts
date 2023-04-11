/*
 * Description: 238：除自身以外数组的乘积
 * Url: https://leetcode.cn/problems/product-of-array-except-self/
 * Created: 2023-04-11 20:50:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 20:50:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import productExceptSelf from '../productExceptSelf'
describe('除自身以外数组的乘积 测试', () => {
  it('productExceptSelf function', () => {
    expect(productExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6])
    expect(productExceptSelf([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0])
  })
})
