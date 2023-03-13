/*
 * Description: 349：两个数组的交集
 * Url: https://leetcode.cn/problems/intersection-of-two-arrays/
 * Created: 2023-03-13 20:09:58
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:10:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import intersection from '../intersection'
describe('两个数组的交集 测试', () => {
  it('intersection function', () => {
    expect(intersection([1, 2, 2, 1], [2, 2])).toEqual([2])
    expect(intersection([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4])
  })
})
