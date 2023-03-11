/*
 * Description: 397：整数替换
 * Url: https://leetcode.cn/problems/integer-replacement/
 * Created: 2023-03-11 22:32:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 22:33:06
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import integerReplacement from '../integerReplacement'
describe('整数替换 测试', () => {
  it('integerReplacement function', () => {
    expect(integerReplacement(8)).toEqual(3)
    expect(integerReplacement(7)).toEqual(4)
    expect(integerReplacement(4)).toEqual(2)
  })
})
