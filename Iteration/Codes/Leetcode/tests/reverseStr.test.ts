/*
 * Description: 反转字符串 II
 * Url: https://leetcode.cn/problems/reverse-string-ii/
 * Created: 2023-03-02 22:38:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 23:49:59
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import reverseStr from '../reverseStr'
describe('反转字符串 II 测试', () => {
  it('reverseStr function', () => {
    reverseStr('abcdefg', 2)
    expect(reverseStr('abcdefg', 2)).toEqual('bacdfeg')

    expect(reverseStr('abcd', 2)).toEqual('bacd')

    expect(
      reverseStr(
        'hyzqyljrnigxvdtneasepfahmtyhlohwxmkqcdfehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqlimjkfnqcqnajmebeddqsgl',
        39
      )
    ).toEqual(
      'fdcqkmxwholhytmhafpesaentdvxginrjlyqzyhehybknvdmfrfvtbsovjbdhevlfxpdaovjgunjqllgsqddebemjanqcqnfkjmi'
    )
  })
})
