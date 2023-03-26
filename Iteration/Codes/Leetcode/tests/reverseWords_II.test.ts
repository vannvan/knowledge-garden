/*
 * Description: 557：反转字符串中的单词 III
 * Url: https://leetcode.cn/problems/reverse-words-in-a-string-iii/
 * Created: 2023-03-26 20:32:48
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-26 20:33:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reverseWords from '../reverseWords_II'
describe('反转字符串中的单词 III 测试', () => {
  it('reverseWords function', () => {
    expect(reverseWords("Let's take LeetCode contest")).toEqual("s'teL ekat edoCteeL tsetnoc")
    expect(reverseWords('God Ding')).toEqual('doG gniD')
  })
})
