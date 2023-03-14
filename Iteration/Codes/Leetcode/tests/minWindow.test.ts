/*
 * Description: 76：最小覆盖子串
 * Url: https://leetcode.cn/problems/minimum-window-substring/
 * Created: 2023-03-14 18:59:20
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-14 19:37:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minWindow from '../minWindow'
describe('最小覆盖子串 测试', () => {
  it('minWindow function', () => {
    minWindow('ab', 'a')
    // return
    expect(minWindow('ADOBECODEBANC', 'ABC')).toEqual('BANC')
    expect(minWindow('a', 'a')).toEqual('a')
    expect(minWindow('a', 'aa')).toEqual('')
    expect(minWindow('ab', 'a')).toEqual('a')
  })
})
