/*
 * Description: 745：寻找比目标字母大的最小字母
 * Url: https://leetcode.cn/problems/find-smallest-letter-greater-than-target/
 * Created: 2023-04-16 20:39:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-16 20:40:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import nextGreatestLetter from '../nextGreatestLetter'
describe('寻找比目标字母大的最小字母 测试', () => {
  it('nextGreatestLetter function', () => {
    expect(nextGreatestLetter(['c', 'f', 'j'], 'a')).toEqual('c')
    expect(nextGreatestLetter(['c', 'f', 'j'], 'c')).toEqual('f')
    expect(nextGreatestLetter(['x', 'x', 'y', 'y'], 'z')).toEqual('x')
  })
})
