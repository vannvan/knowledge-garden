/*
 * Description: 718：最长重复子数组
 * Url: https://leetcode.cn/problems/maximum-length-of-repeated-subarray/
 * Created: 2023-03-18 16:04:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 16:11:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findLength from '../findLength'
describe('最长重复子数组 测试', () => {
  it('findLength function', () => {
    expect(findLength([1, 2, 3, 2, 1], [3, 2, 1, 4, 7])).toEqual(3)
    expect(findLength([0, 0, 0, 0, 0], [0, 0, 0, 0, 0])).toEqual(5)
  })
})
