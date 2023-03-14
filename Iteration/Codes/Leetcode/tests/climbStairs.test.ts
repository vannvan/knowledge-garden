/*
 * Description: 70：爬楼梯
 * Url: https://leetcode.cn/problems/climbing-stairs/
 * Created: 2023-03-14 21:00:40
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 21:00:58
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import climbStairs from '../climbStairs'
describe('爬楼梯 测试', () => {
  it('climbStairs function', () => {
    expect(climbStairs(2)).toEqual(2)
    expect(climbStairs(3)).toEqual(3)
  })
})
