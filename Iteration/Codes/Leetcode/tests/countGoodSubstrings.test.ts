/*
 * Description: 1987：长度为三且各字符不同的子字符串
 * Url: https://leetcode.cn/problems/substrings-of-size-three-with-distinct-characters/
 * Created: 2023-04-15 16:35:24
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-15 16:35:49
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countGoodSubstrings from '../countGoodSubstrings'
describe('长度为三且各字符不同的子字符串 测试', () => {
  it('countGoodSubstrings function', () => {
    expect(countGoodSubstrings('xyzzaz')).toEqual(1)
    expect(countGoodSubstrings('aababcabc')).toEqual(4)
  })
})
