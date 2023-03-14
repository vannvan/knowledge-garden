/*
 * Description: 62：不同路径
 * Url: https://leetcode.cn/problems/unique-paths/
 * Created: 2023-03-14 22:32:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 22:32:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import uniquePaths from '../uniquePaths'
describe('不同路径 测试', () => {
  it('uniquePaths function', () => {
    expect(uniquePaths(3, 7)).toEqual(28)
    expect(uniquePaths(3, 2)).toEqual(3)
  })
})
