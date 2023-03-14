/*
 * Description: 1013：斐波那契数
 * Url: https://leetcode.cn/problems/fibonacci-number/
 * Created: 2023-03-14 21:28:23
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 21:32:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import fib from '../fib'
describe('斐波那契数 测试', () => {
  it('fib function', () => {
    expect(fib(2)).toEqual(1)
    expect(fib(3)).toEqual(2)
    expect(fib(4)).toEqual(3)
  })
})
