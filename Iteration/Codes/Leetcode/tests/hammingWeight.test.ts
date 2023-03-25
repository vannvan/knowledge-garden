/*
 * Description: 191：位1的个数
 * Url: https://leetcode.cn/problems/number-of-1-bits/
 * Created: 2023-03-24 23:16:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 23:44:27
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import hammingWeight from '../hammingWeight'
describe('位1的个数 测试', () => {
  it('hammingWeight function', () => {
    expect(hammingWeight(00000000000000000000000000001011)).toEqual(3)
    // @ts-nocheck
    // expect(hammingWeight(00000000000000000000000010000000)).toEqual(1)
    expect(hammingWeight(11111111111111111111111111111101)).toEqual(31)
  })
})
