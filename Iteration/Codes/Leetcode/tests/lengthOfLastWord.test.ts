/*
 * Description: 58：最后一个单词的长度
 * Url: https://leetcode.cn/problems/length-of-last-word/
 * Created: 2023-04-14 20:54:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-14 20:54:35
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import lengthOfLastWord from '../lengthOfLastWord'
describe('最后一个单词的长度 测试', () => {
  it('lengthOfLastWord function', () => {
    expect(lengthOfLastWord('Hello World')).toEqual(5)
    expect(lengthOfLastWord('   fly me   to   the moon  ')).toEqual(4)
    expect(lengthOfLastWord('luffy is still joyboy')).toEqual(6)
  })
})
