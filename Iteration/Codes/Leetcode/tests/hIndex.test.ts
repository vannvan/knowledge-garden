/*
 * Description: 274：H 指数
 * Url: https://leetcode.cn/problems/h-index/
 * Created: 2023-04-27 23:08:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-27 23:30:34
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import hIndex from '../hIndex'
describe('H 指数 测试', () => {
  it('hIndex function', () => {
    expect(hIndex([3, 0, 6, 1, 5])).toEqual(3)
    expect(hIndex([1, 3, 1])).toEqual(1)
    expect(hIndex([1])).toEqual(1)
  })
})
