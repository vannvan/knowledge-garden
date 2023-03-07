/*
 * Description: 分割回文串
 * Url: https://leetcode.cn/problems/palindrome-partitioning/
 * Created: 2023-03-07 20:29:08
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 20:54:28
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import partition from '../partition'
describe('分割回文串 测试', () => {
  it('partition function', () => {
    partition('aab')

    // return
    expect(partition('aab')).toEqual(
      expect.arrayContaining([
        ['a', 'a', 'b'],
        ['aa', 'b'],
      ])
    )
    expect(partition('a')).toEqual([['a']])
  })
})
