/*
 * Description: 97：交错字符串
 * Url: https://leetcode.cn/problems/interleaving-string/
 * Created: 2023-05-06 23:01:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-06 23:39:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isInterleave from '../isInterleave'
describe('交错字符串 测试', () => {
  it('isInterleave function', () => {
    expect(isInterleave('aabcc', 'dbbca', 'aadbbcbcac')).toEqual(true)
    expect(isInterleave('aabcc', 'dbbca', 'aadbbbaccc')).toEqual(false)
    expect(isInterleave('', '', '')).toEqual(true)
    expect(isInterleave('', 'b', 'b')).toEqual(true)
  })
})
