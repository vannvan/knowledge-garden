/*
 * Description: 567：字符串的排列
 * Url: https://leetcode.cn/problems/permutation-in-string/
 * Created: 2023-03-13 22:37:45
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 22:53:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import checkInclusion from '../checkInclusion'
describe('字符串的排列 测试', () => {
  it('checkInclusion function', () => {
    expect(checkInclusion('ab', 'eidbaooo')).toEqual(true)
    expect(checkInclusion('ab', 'eidboaoo')).toEqual(false)
    expect(checkInclusion('hello', 'ooolleoooleh')).toEqual(false)
  })
})
