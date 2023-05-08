/*
 * Description: 275：H 指数 II
 * Url: https://leetcode.cn/problems/h-index-ii/
 * Created: 2023-05-08 23:23:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-08 23:34:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import hIndex from '../hIndex_II'
describe('H 指数 II 测试', () => {
  it('hIndex function', () => {
    expect(hIndex([0, 1, 3, 5, 6])).toEqual(3)
    expect(hIndex([1, 2, 100])).toEqual(2)
    expect(hIndex([0, 1, 3, 5, 6])).toEqual(3)
    expect(hIndex([0])).toEqual(0)
    expect(hIndex([100])).toEqual(1)
  })
})
