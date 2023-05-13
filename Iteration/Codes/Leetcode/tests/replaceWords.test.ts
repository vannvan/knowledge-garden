/*
 * Description: 648：单词替换
 * Url: https://leetcode.cn/problems/replace-words/
 * Created: 2023-05-13 23:31:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-13 23:37:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import replaceWords from '../replaceWords'
describe('单词替换 测试', () => {
  it('replaceWords function', () => {
    expect(replaceWords(['a', 'b', 'c'], 'aadsfasf absbs bbab cadsfafs')).toEqual('a a b c')
    expect(replaceWords(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery')).toEqual(
      'the cat was rat by the bat'
    )
  })
})
