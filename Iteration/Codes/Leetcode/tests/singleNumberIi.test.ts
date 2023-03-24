/*
 * Description: 137：只出现一次的数字 II
 * Url: https://leetcode.cn/problems/single-number-ii/
 * Created: 2023-03-24 22:42:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-24 22:42:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import singleNumberIi from '../singleNumberIi'
describe('只出现一次的数字 II 测试', () => {
  it('singleNumberIi function', () => {
    expect(singleNumberIi([2, 2, 3, 2])).toEqual(3)
    expect(singleNumberIi([0, 1, 0, 1, 0, 1, 99])).toEqual(99)
  })
})
