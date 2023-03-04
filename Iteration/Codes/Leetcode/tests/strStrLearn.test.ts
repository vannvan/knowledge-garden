/*
 * Description: 找出字符串中第一个匹配项的下标
 * Url: https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 * Created: 2023-03-04 15:32:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 15:44:20
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import strStrLearn from '../strStrLearn'
describe('找出字符串中第一个匹配项的下标 测试', () => {
  it('strStrLearn function', () => {
    let s = strStrLearn('aabaabaaf', 'aabaaf')
    console.log('s', s)
    // return
    expect(strStrLearn('aabaabaaf', 'aabaaf')).toEqual(3)
    expect(strStrLearn('sadbutsad', 'sad')).toEqual(0)
    expect(strStrLearn('leetcode', 'leeto')).toEqual(-1)
  })
})
