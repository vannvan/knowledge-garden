/*
 * Description: 438：找到字符串中所有字母异位词
 * Url: https://leetcode.cn/problems/find-all-anagrams-in-a-string/
 * Created: 2023-03-13 23:09:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 23:09:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import findAnagrams from '../findAnagrams'
describe('找到字符串中所有字母异位词 测试', () => {
  it('findAnagrams function', () => {
    expect(findAnagrams('cbaebabacd', 'abc')).toEqual([0, 6])
    expect(findAnagrams('abab', 'ab')).toEqual([0, 1, 2])
  })
})
