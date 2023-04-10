/*
 * Description: 33：搜索旋转排序数组
 * Url: https://leetcode.cn/problems/search-in-rotated-sorted-array/
 * Created: 2023-04-10 21:19:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 21:20:08
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import search from '../search'
describe('搜索旋转排序数组 测试', () => {
  it('search function', () => {
    expect(search([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4)
    expect(search([4, 5, 6, 7, 0, 1, 2], 3)).toEqual(-1)
    expect(search([1], 0)).toEqual(-1)
  })
})
