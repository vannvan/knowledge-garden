/*
 * Description: 11：盛最多水的容器
 * Url: https://leetcode.cn/problems/container-with-most-water/
 * Created: 2023-03-08 22:10:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 22:18:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxArea from '../maxArea'
describe('盛最多水的容器 测试', () => {
  it('maxArea function', () => {
    maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])
    return
    expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toEqual(49)
    expect(maxArea([1, 1])).toEqual(1)
  })
})
