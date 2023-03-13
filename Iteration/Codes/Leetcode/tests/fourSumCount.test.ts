/*
 * Description: 454：四数相加 II
 * Url: https://leetcode.cn/problems/4sum-ii/
 * Created: 2023-03-13 20:45:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:46:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import fourSumCount from '../fourSumCount'
describe('四数相加 II 测试', () => {
  it('fourSumCount function', () => {
    expect(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2])).toEqual(2)
    expect(fourSumCount([0], [0], [0], [0])).toEqual(1)
  })
})
