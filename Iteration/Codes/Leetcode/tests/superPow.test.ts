/*
 * Description: 372：超级次方
 * Url: https://leetcode.cn/problems/super-pow/
 * Created: 2023-03-25 17:01:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 17:01:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import superPow from '../superPow'
describe('超级次方 测试', () => {
  it('superPow function', () => {
    expect(superPow(2, [3])).toEqual(8)
    expect(superPow(2, [1, 0])).toEqual(1024)
    expect(superPow(1, [4, 3, 3, 8, 5, 2])).toEqual(1)
  })
})
