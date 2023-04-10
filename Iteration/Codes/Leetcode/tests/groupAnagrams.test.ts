/*
 * Description: 49：字母异位词分组
 * Url: https://leetcode.cn/problems/group-anagrams/
 * Created: 2023-04-10 21:49:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 21:59:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import groupAnagrams from '../groupAnagrams'
describe('字母异位词分组 测试', () => {
  it('groupAnagrams function', () => {
    expect(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])).toEqual([
      ['eat', 'tea', 'ate'],
      ['tan', 'nat'],
      ['bat'],
    ])

    expect(groupAnagrams([''])).toEqual([['']])
    expect(groupAnagrams(['a'])).toEqual([['a']])
  })
})
