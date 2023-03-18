/*
 * Description: 115：不同的子序列
 * Url: https://leetcode.cn/problems/distinct-subsequences/
 * Created: 2023-03-18 20:47:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 20:47:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import numDistinct from '../numDistinct'
describe('不同的子序列 测试', () => {
  it('numDistinct function', () => {
    expect(numDistinct('rabbbit', 'rabbit')).toEqual(3)
    expect(numDistinct('babgbag', 'bag')).toEqual(5)
  })
})
