/*
 * Description: 反转字符串中的单词
 * Url: https://leetcode.cn/problems/reverse-words-in-a-string/
 * Created: 2023-03-02 19:44:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 21:28:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import reverseWords from '../reverseWords'
describe('反转字符串中的单词 测试', () => {
  it('reverseWords function', () => {
    reverseWords('a good   example')
    // return
    // return
    expect(reverseWords('the sky is blue')).toEqual('blue is sky the')

    expect(reverseWords('  hello world  ')).toEqual('world hello')

    expect(reverseWords('a good   example')).toEqual('example good a')
  })
})
