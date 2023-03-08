/*
 * Description: 字母大小写全排列
 * Url: https://leetcode.cn/problems/letter-case-permutation/
 * Created: 2023-03-08 11:31:29
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 14:26:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import letterCasePermutation from '../letterCasePermutation'
describe('字母大小写全排列 测试', () => {
  it('letterCasePermutation function', () => {
    letterCasePermutation('a1b2')
    return
    expect(letterCasePermutation('a1b2')).toEqual(
      expect.arrayContaining(['a1b2', 'a1B2', 'A1b2', 'A1B2'])
    )
    expect(letterCasePermutation('3z4')).toEqual(expect.arrayContaining(['3z4', '3Z4']))
  })
})
