/*
 * Description: 387：字符串中的第一个唯一字符
 * Url: https://leetcode.cn/problems/first-unique-character-in-a-string/
 * Created: 2023-04-09 21:26:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-09 21:34:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import firstUniqChar from '../firstUniqChar'
describe('字符串中的第一个唯一字符 测试', () => {
  it('firstUniqChar function', () => {
    expect(firstUniqChar('leetcode')).toEqual(0)
    expect(firstUniqChar('d')).toEqual(0)

    expect(firstUniqChar('loveleetcode')).toEqual(2)
    expect(firstUniqChar('aabb')).toEqual(-1)
  })
})
