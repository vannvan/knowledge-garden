/*
 * Description: 242：有效的字母异位词
 * Url: https://leetcode.cn/problems/valid-anagram/
 * Created: 2023-03-13 20:00:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-13 20:01:25
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isAnagram from '../isAnagram'
describe('有效的字母异位词 测试', () => {
  it('isAnagram function', () => {
    expect(isAnagram('anagram', 'nagaram')).toEqual(true)
    expect(isAnagram('rat', 'car')).toEqual(false)
  })
})
