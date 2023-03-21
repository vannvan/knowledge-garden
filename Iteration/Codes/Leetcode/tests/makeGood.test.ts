/*
 * Description: 1666：整理字符串
 * Url: https://leetcode.cn/problems/make-the-string-great/
 * Created: 2023-03-21 22:21:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-21 22:38:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import makeGood from '../makeGood'
describe('整理字符串 测试', () => {
  it('makeGood function', () => {
    makeGood('abBAcC')
    expect(makeGood('leEeetcode')).toEqual('leetcode')
    expect(makeGood('abBAcC')).toEqual('')
    expect(makeGood('s')).toEqual('s')
  })
})
