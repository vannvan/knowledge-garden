/*
 * Description: 1304：最长快乐字符串
 * Url: https://leetcode.cn/problems/longest-happy-string/
 * Created: 2023-03-16 21:50:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 22:16:56
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import longestDiverseString from '../longestDiverseString'
describe('最长快乐字符串 测试', () => {
  it('longestDiverseString function', () => {
    longestDiverseString(1, 1, 7)
    expect(longestDiverseString(1, 1, 7)).toEqual('ccaccbcc')
    expect(longestDiverseString(7, 1, 0)).toEqual('aabaa')
  })
})
