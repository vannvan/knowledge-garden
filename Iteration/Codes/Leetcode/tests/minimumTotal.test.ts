/*
 * Description: 120：三角形最小路径和
 * Url: https://leetcode.cn/problems/triangle/
 * Created: 2023-05-04 23:12:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-04 23:59:30
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minimumTotal from '../minimumTotal'
describe('三角形最小路径和 测试', () => {
  it('minimumTotal function', () => {
    expect(minimumTotal([[-1], [2, 3], [1, -1, -3]])).toEqual(-1)
    expect(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])).toEqual(11)
    expect(minimumTotal([[-10]])).toEqual(-10)
  })
})
