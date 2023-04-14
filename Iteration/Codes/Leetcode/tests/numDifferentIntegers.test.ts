/*
 * Description: 1933：字符串中不同整数的数目
 * Url: https://leetcode.cn/problems/number-of-different-integers-in-a-string/
 * Created: 2023-04-14 21:36:49
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 21:37:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import numDifferentIntegers from '../numDifferentIntegers'
describe('字符串中不同整数的数目 测试', () => {
  it('numDifferentIntegers function', () => {
    expect(numDifferentIntegers('a123bc34d8ef34')).toEqual(3)
    expect(numDifferentIntegers('leet1234code234')).toEqual(2)
    expect(numDifferentIntegers('a1b01c001')).toEqual(1)
  })
})
