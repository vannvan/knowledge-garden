/*
 * Description: 50：Pow(x, n)
 * Url: https://leetcode.cn/problems/powx-n/
 * Created: 2023-04-25 23:37:31
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-25 23:41:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import myPow from '../myPow'
describe('Pow(x, n) 测试', () => {
  it('myPow function', () => {
    expect(myPow(2.0, 10)).toEqual(1024.0)
    expect(myPow(2.1, 3)).toEqual(9.261)
    expect(myPow(2.0, -2)).toEqual(0.25)
  })
})
