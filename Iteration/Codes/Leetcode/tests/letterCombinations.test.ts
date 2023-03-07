/*
 * Description: 电话号码的字母组合
 * Url: https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * Created: 2023-03-05 22:05:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 19:47:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import letterCombinations from '../letterCombinations'
describe('电话号码的字母组合 测试', () => {
  it('letterCombinations function', () => {
    console.log(letterCombinations('2'))
    return
    expect(letterCombinations('23')).toEqual(
      expect.arrayContaining(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
    )
    expect(letterCombinations('')).toEqual([])
    expect(letterCombinations('2')).toEqual(expect.arrayContaining(['a', 'b', 'c']))
  })
})
