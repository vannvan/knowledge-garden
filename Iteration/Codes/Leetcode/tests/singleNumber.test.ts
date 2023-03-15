/*
 * Description: 136：只出现一次的数字
 * Url: https://leetcode.cn/problems/single-number/
 * Created: 2023-03-15 23:02:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-15 23:02:48
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import singleNumber from '../singleNumber'
describe('只出现一次的数字 测试', () => {
  it('singleNumber function', () => {
    expect(singleNumber([2, 2, 1])).toEqual(1)
    expect(singleNumber([4, 1, 2, 1, 2])).toEqual(4)
    expect(singleNumber([1])).toEqual(1)
  })
})
