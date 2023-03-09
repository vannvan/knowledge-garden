/*
 * Description: 219：存在重复元素 II
 * Url: https://leetcode.cn/problems/contains-duplicate-ii/
 * Created: 2023-03-09 20:54:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-09 20:55:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import containsNearbyDuplicate from '../containsNearbyDuplicate'
describe('存在重复元素 II 测试', () => {
  it('containsNearbyDuplicate function', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toEqual(true)
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toEqual(true)
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toEqual(false)
  })
})
