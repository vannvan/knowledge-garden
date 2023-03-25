/*
 * Description: 367：有效的完全平方数
 * Url: https://leetcode.cn/problems/valid-perfect-square/
 * Created: 2023-03-25 22:18:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 22:19:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isPerfectSquare from '../isPerfectSquare'
describe('有效的完全平方数 测试', () => {
  it('isPerfectSquare function', () => {
    expect(isPerfectSquare(16)).toEqual(true)
    expect(isPerfectSquare(14)).toEqual(false)
  })
})
