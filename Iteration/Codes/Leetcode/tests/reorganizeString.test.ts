/*
 * Description: 778：重构字符串
 * Url: https://leetcode.cn/problems/reorganize-string/
 * Created: 2023-03-12 16:57:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 16:58:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reorganizeString from '../reorganizeString'
describe('重构字符串 测试', () => {
  it('reorganizeString function', () => {
    expect(reorganizeString('aab')).toEqual('aba')
    expect(reorganizeString('aaab')).toEqual('')
  })
})
