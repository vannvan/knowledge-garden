/*
 * Description: 338：比特位计数
 * Url: https://leetcode.cn/problems/counting-bits/
 * Created: 2023-04-11 22:40:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-11 22:40:40
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countBits from '../countBits'
describe('比特位计数 测试', () => {
  it('countBits function', () => {
    expect(countBits(2)).toEqual([0, 1, 1])
    expect(countBits(5)).toEqual([0, 1, 1, 2, 1, 2])
  })
})
