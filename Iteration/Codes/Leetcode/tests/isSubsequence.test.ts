/*
 * Description: 392：判断子序列
 * Url: https://leetcode.cn/problems/is-subsequence/
 * Created: 2023-03-18 20:26:11
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-18 20:32:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isSubsequence from '../isSubsequence'
describe('判断子序列 测试', () => {
  it('isSubsequence function', () => {
    expect(isSubsequence('axc', 'ahbgdc')).toEqual(false)
    expect(isSubsequence('abc', 'ahbgdc')).toEqual(true)
  })
})
