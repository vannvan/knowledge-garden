/*
 * Description: 最长公共前缀
 * Url: https://leetcode.cn/problems/longest-common-prefix/
 * Created: 2023-03-05 16:24:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-24 20:17:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestCommonPrefix from '../longestCommonPrefix'
describe('最长公共前缀 测试', () => {
  it('longestCommonPrefix function', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toEqual('fl')
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toEqual('')
  })
  expect(longestCommonPrefix(['aaa', 'aa', 'aaa'])).toEqual('aa')
})
